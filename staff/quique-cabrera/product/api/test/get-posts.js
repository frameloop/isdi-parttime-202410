fetch('http://localhost:8080/users', {
    method: 'GET',
    headers: Autorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzkyYWE2ZmQ3NWI3NjdhNTUyZTJkYzMiLCJpYXQiOjE3MzkzNzUxNDN9.NxHsivUTSW2N8faRDxsXCW4hlfUHlHlzG0IeJ9kp1r0'
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