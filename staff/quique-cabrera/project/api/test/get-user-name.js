fetch('http://localhost:8080/users', {
    method: 'GET',
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2M4NzIyYWIxODRmNWZlZWVhNzg5ZjEiLCJpYXQiOjE3NDExOTM0NjB9.V0udQh2Trq2ylw8QVjDMqbDKS35-YlVJqWzJMROzsmk'
    }
})
    .then(res => {
        const { status } = res

        if (status === 200)
            return res.json()
                .then(body => console.log('OK', status, body))

        return res.json()
            .then(body => console.log('KO', status, body))
    })
    .catch(error => console.error(error))