build:
	npm run build
	sudo docker build -t notify-queue .
run:
	sudo docker run -d -p 3000:3000 --name notify-queue notify-queue
rebuild:
	npm run build
	sudo docker build -t notify-queue .
	sudo docker rm -f notify-queue
	sudo docker run -d -p 3000:3000 --name notify-queue notify-queue
