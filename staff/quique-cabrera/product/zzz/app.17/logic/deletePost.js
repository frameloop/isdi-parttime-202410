import validate from './helper/validate'

const deletePost = postId => {
    validate.id(postId, 'postId')

    return fetch(`http://localhost:8080/posts/${postId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Basic ${sessionStorage.userId}`,
        },

    })
        .catch(error => { throw new Error(error.message) })
        .then(res => {
            const { status } = res

            if (status === 204)
                return

            return res.json()
                .then(body => {
                    const { error, message } = body

                    throw new Error(message)
                })
        })
}

export default deletePost