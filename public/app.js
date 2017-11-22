const AddUser = document.querySelector('.AddUser')
AddUser.addEventListener('submit', (e) => {
  e.preventDefault()
  const username = AddUser.querySelector('.username').value
  const password = AddUser.querySelector('.password').value
  post('addUser', {username, password})
})

function post (path, data) {
  return window.fetch(path, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}
