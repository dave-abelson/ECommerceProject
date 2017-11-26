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
      password: req.body.password,
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    })
    .then(() => res.sendStatus(200))
})

app.listen(8000, () => {
  console.log('Server running on http://localhost:8000')
})

