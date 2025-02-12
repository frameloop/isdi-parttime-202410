import { validate, errors } from 'com'

const toggleLikePost = postId => {
    validate.id(postId, 'postId')

    return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/likes`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
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

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default toggleLikePost