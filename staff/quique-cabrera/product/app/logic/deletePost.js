logic.deletePost = postId => {
    validate.id(postId, 'postId')

    return fetch('http://localhost:8080/posts/:postId', {
        method: 'DELETE',
        headers: {
            Authorization: `Basic ${sessionStorage.userId}`,
            'Content-Type': 'application/json'
        },

    })
        .catch(error => { throw new Error(error.message) })
        .then(res => {
            const { status } = res

            if (status === 201)
                return res.json()
                    .then(postId => postId)

            return res.json()
                .then(body => {
                    const { error, message } = body

                    throw new Error(message)
                })
        })
}
