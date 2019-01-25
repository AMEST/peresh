npm run build
docker build -t peresh-app .
docker run --rm -d -p 8080:80 --name running-peresh peresh-app