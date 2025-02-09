fetch('http://localhost:8080/users/auth', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  //body: '{"username":"peterpan", "password":"123123123"}'
  body: JSON.stringify({ username: 'peterpan', password: '123123123' })
})

  .then(res => {
    const { status } = res

    if (status === 201) {
      console.log('OK', status)

      return
    }

    return res.json()
      .then(body => console.log('KO', status, body))
  })
  .catch(error => console.error(error))