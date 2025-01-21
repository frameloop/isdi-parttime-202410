fetch('http://localhost:8080/posts', {
    method: 'POST',
    headers: {
        Authorization: 'Basic m2w92r8h10',
        'Content-Type': 'application/json'
    },
    // body: '{"image": "https://i.ytimg.com/vi/9oWEZSL_53U/maxresdefault.jpg","text": "dream team"}'
    body: JSON.stringify({ image: 'https://i.ytimg.com/vi/9oWEZSL_53U/maxresdefault.jpg', text: 'dream team' })
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