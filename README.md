# Peresh   
**Very simple task tracker**   
**[Try Peresh](https://peresh.ml)**   
**[Docker hub](https://hub.docker.com/r/eluki/peresh)**
## Description
Peresh - is the simple tracker for personal affairs. Peresh has 2 work mode:
1. Local - all data save in browser
1. Dropbox - auth in your Dropbox account and auto sync all data with local data (in browser) and data in dropbox **(only on rebuild with change dropbox clientId)**

## Usage
### Run build
```
docker build -t peresh .
``` 
### Run build & launch docker image
#### Docker cli: 
```
docker run -d -p 8080:80 eluki/peresh:latest
```
#### Docker-compose / Swarm Stack   
```
version: '3.7'

services:
  web:
    image: eluki/peresh:latest
    ports:
     - 8080:80
```
and cli command:
```
docker stack deploy -c deploy.yml peresh
```

## For link Peresh to you own dropbox OAuth app
`
In main.js replace "client_id" inside "goAuthDropBox" function
`
