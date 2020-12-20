.PHONY : build run runSam

build:
	mkdir functions 
	go get ./endpoints/...
	go build -o functions/users ./endpoints/users
	npm run build
	echo '/* /index.html 200' >build/_redirects
run: build runSam

runSam: 
	sam local start-api -s ./build --docker-network main