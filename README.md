![CI](https://github.com/AMEST/peresh/workflows/CI/badge.svg?branch=master) 
![hub.docker.com](https://img.shields.io/docker/pulls/eluki/peresh.svg) 
![GitHub release (latest by date)](https://img.shields.io/github/v/release/amest/peresh)
![GitHub](https://img.shields.io/github/license/amest/peresh)
# Peresh   
**[Try Peresh](https://peresh.ml)**   
**[Docker hub](https://hub.docker.com/r/eluki/peresh)**
## Description
Peresh - is the simple tracker for personal affairs. Task tracking and managment. To do lists.

Peresh has 2 work mode:
1. Local - all data save in browser
1. Dropbox - auth in your Dropbox account and auto sync all data with local data (in browser) and data in dropbox

Implemented features:
1. Create, delete, update tasks
1. Transfer to different statuses
1. Markdown markup of the task summary
1. Progress bar with color-coded time to completion date
1. Custom statuses
1. Integration with dropbox for storing tasks
1. Two interface languages
1. Light/Dark theme
1. Export/Import `tasks.json`

## ScreenShots
![Welcome](https://i.postimg.cc/gkYy3XXb/2020-11-27-23-08-53-localhost-e4238fe63951.png)
![Main](https://i.postimg.cc/SxRWtBfZ/2020-11-27-23-09-15-localhost-a170e70a62ae.png)
![Task Create](https://i.postimg.cc/j5HN7tRj/2020-11-27-23-12-04-localhost-2ada7ff1ae7c.png)
![Task View](https://i.postimg.cc/pTbzrpb7/2020-11-27-23-12-37-localhost-3a516f1ff671.png)
![Settings](https://i.postimg.cc/x1ZKr6s9/2020-11-27-23-09-48-localhost-2349c0cec5df.png)
![Settings](https://i.postimg.cc/W4J0s0Kg/2020-11-27-23-12-43-localhost-b67c24d9e361.png
)
## Usage
### Build
```
docker build -t peresh .
``` 
### Launch docker image
#### Docker cli: 
```bash
docker run -d \
           -p 8080:80 \
           -e DropBoxClientId=[ClientId] \
           --restart always \
           --name peresh \
           eluki/peresh:latest
```
#### Docker-compose / Swarm Stack   
```yml
version: '3.8'

services:
  web:
    image: eluki/peresh:latest
    environment:
      - "DropBoxClientId=[ClientId]"
    ports:
     - 8080:80
    deploy:
      replicas: 1
      resources:
        limits:
          memory: 25M
      placement:
        max_replicas_per_node: 1
      restart_policy:
        condition: on-failure
```

and cli command:

```bash
docker stack deploy -c deploy.yml peresh
```
