var express = require('express')
var app = express()
app.use(express.static('dist'))
app.listen(3000, function () {
  console.log('Peresh app listening on port 3000!')
})
