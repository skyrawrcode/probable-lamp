build:
	mkdir functions
	go get ./endpoints/...
	go build -o functions/users ./endpoints/users
	npm run build