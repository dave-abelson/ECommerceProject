// the server

var express = require('express')
var bodyParser = require('body-parser')

var store = require('./store')

var app = express()

app.use(express.static('public'))
app.use(bodyParser.json())

app.post('/addUser', (req, res) => {
  store
    .addUser({
      username: req.body.username,
      password: req.body.password
    })
    .then(() => res.sendStatus(200))
})

app.listen(8000, () => {
  console.log('Server running on http://localhost:8000')
})

