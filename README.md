# Peresh   
**Very simple task tracker**   
**[Try Peresh](https://peresh.ml)**   
**[Docker hub](https://hub.docker.com/r/eluki/peresh)**
## Description
Peresh - is the simple tracker for personal affairs. Task tracking and managment. To do lists.

Peresh has 2 work mode:
1. Local - all data save in browser
1. Dropbox - auth in your Dropbox account and auto sync all data with local data (in browser) and data in dropbox **(only on rebuild with change dropbox clientId)**

Implemented features:
1) Create, delete tasks
2) Transfer to different statuses
3) Markdown markup of the task text
4) Progress bar with color-coded time to completion date
5) Custom statuses
6) Integration with dropbox for storing tasks
7) Two interface languages

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
