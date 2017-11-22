module.exports = {
  addUser ( user) {
    console.log('Added user %s with password %s', user.username, user.password)
    return Promise.resolve()
  }
}
