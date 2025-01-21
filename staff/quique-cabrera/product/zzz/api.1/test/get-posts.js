fetch('http://localhost:8080/posts', {
    method: 'GET',
    headers: Autorization: 'Basic m2w92r8h10'
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