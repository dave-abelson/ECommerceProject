const AddUser = document.querySelector('.AddUser')
AddUser.addEventListener('submit', (e) => {
  e.preventDefault()
  const firstName = AddUser.querySelector('.firstName').value
  const lastName = AddUser.querySelector('.lastName').value
  const email = AddUser.querySelector('.email').value
  const password = AddUser.querySelector('.password').value
  post('/auth/addUser', {firstName, lastName, email, password})
})

function post (path, data) {
  console.log(data)
  return window.fetch(path, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}
