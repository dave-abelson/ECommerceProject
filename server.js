// the server

var express = require('express')
var bodyParser = require('body-parser')
var path = require('path');

var index = require('./routes/index');
var store = require('./store')
var admin = require('./routes/admin')
var api = require('./routes/api')
var authenticate = require('./routes/authenticate');
var app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

//app.use(express.static('public'))
app.use(bodyParser.json())
app.use('/auth', authenticate);
app.use('/', index);
app.use('/admin', admin)
app.use('/api', api)
app.use(express.static(__dirname + /public/));

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

app.post('/addItem', (req, res) => {
  store.addItem({
    name: req.body.name,
    price: req.body.price,
    category: req.body.category
  })
  .then(() => res.sendStatus(200))
})

app.listen(8000, () => {
  console.log('Server running on http://localhost:8000')
})

