logic.deletePost = postId => {
    validate.id(postId, 'postId')

    return fetch('http://localhost:8080/posts', {
        method: 'DELETE',
        headers: {
            Autorization: `Basic ${sessionStorege.userId}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ postId })
    })
        .catch(error => { throw new Error(error.message) })
        .then(res => {
            const { status } = res

            if (status === 201) return // early return

            return res.json()
                .then(body => {
                    const { error, message } = body

                    throw new Error(message)
                })
        })
}
