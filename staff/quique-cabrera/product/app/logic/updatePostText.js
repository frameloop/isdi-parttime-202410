import { validate, errors } from 'com'

const updatePostText = (postId, text) => {
    validate.id(postId, 'postId')
    validate.text(text)

    return fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/text`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
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

export default updatePostText