fetch('http://localhost:8080/users/auth', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: 'open', password: 'A3x9zLp8Q1' })
})

    .then(res => {
        // console.log('HTTP Status:', res.status);
        // console.log('Headers:', [...res.headers]);

        const { status } = res

        if (status === 201) {
            // console.log('OK', status)

            return
        }

        return res.json()
            .then(body => console.log('KO', status, body))
            .catch(() => console.log('No JSON in response'))
    })
    .catch(error => console.error('Fetch error:', error))
