package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"os"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	_ "github.com/lib/pq"
)

var db *sql.DB

const (
	dbhost = "DBHOST"
	dbport = "DBPORT"
	dbuser = "DBUSER"
	dbpass = "DBPASS"
	dbname = "DBNAME"
)

type user struct {
	UserID string `json:"userId"`
	Name   string `json:"name"`
}

func getUsers(db *sql.DB) ([]user, error) {
	rows, err := db.Query("SELECT userid, name from users")

	if err != nil {
		return nil, err
	}

	defer rows.Close()
	users := []user{}
	for rows.Next() {
		var u user
		if err := rows.Scan(&u.UserID, &u.Name); err != nil {
			return nil, err
		}
		users = append(users, u)
	}

	return users, nil
}

func handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	users, err := getUsers(db)

	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: 500,
			Body:       "An error has occurred",
		}, err
	}

	bytes, err := json.Marshal(users)
	return events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       (string(bytes)),
	}, nil
}

func main() {
	initDb()
	defer db.Close()

	// Make the handler available for Remote Procedure Call by AWS Lambda
	lambda.Start(handler)
}

func initDb() {
	config := dbConfig()
	var err error
	psqlInfo := fmt.Sprintf("host=%s port=%s user=%s "+
		"password=%s dbname=%s sslmode=disable",
		config[dbhost], config[dbport],
		config[dbuser], config[dbpass], config[dbname])

	db, err = sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}
	err = db.Ping()
	if err != nil {
		panic(err)
	}
	fmt.Println("Successfully connected!")
}

func dbConfig() map[string]string {
	conf := make(map[string]string)
	host, ok := os.LookupEnv(dbhost)
	if !ok {
		panic("DBHOST environment variable required but not set")
	}
	port, ok := os.LookupEnv(dbport)
	if !ok {
		panic("DBPORT environment variable required but not set")
	}
	user, ok := os.LookupEnv(dbuser)
	if !ok {
		panic("DBUSER environment variable required but not set")
	}
	password, ok := os.LookupEnv(dbpass)
	if !ok {
		panic("DBPASS environment variable required but not set")
	}
	name, ok := os.LookupEnv(dbname)
	if !ok {
		panic("DBNAME environment variable required but not set")
	}
	conf[dbhost] = host
	conf[dbport] = port
	conf[dbuser] = user
	conf[dbpass] = password
	conf[dbname] = name
	return conf
}
