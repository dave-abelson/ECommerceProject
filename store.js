const knex = require('knex')(require('./knexfile'))

module.exports = {
  addUser (user) {
    console.log('Added user %s with password %s', user.email, user.password)
    var row = {FirstName: user.firstname, LastName: user.lastname, EmailAddress: user.email, Password: user.password}
    return knex.insert(row).into('customer')
  }
}
