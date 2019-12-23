# Peresh
## Description
Peresh - is the simple tracker for personal affairs. Peresh has 2 work mode:
1. Local - all data save in browser
1. Dropbox - auth in your Dropbox account and auto sync all data with local data (in browser) and data in dropbox

## Install project
### Install packages
```
npm install
```
### Compiles and hot-reloads for development
```
npm run serve
```
### Compiles and minifies for production
```
npm run build
```
### Run express server
```
node express.js
```
## Run build & launch docker image
```
 docker build -t peresh .
 docker run -d --restart=always --name peresh -p 8080:80 peresh
``` 
## For link Peresh to you own dropbox OAuth app
`
In main.js replace "client_id" inside "goAuthDropBox" function
`