build:
	mkdir -p functions
	go get ./...
	go build -o functions/hello-lambda ./...
	npm run build