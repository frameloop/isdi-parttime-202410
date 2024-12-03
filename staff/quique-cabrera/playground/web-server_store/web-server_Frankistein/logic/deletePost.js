const localStorage = require('../data/localStorage');
const validate = require('./helpers/validate');

const deletePost = postId => {
    validate.id(postId, 'postId')

    const posts = JSON.parse(localStorage.posts)

    const index = posts.findIndex(post => post.id === postId)

    if (index < 0) throw new Error('post not found')

    posts.splice(index, 1)

    localStorage.posts = JSON.stringify(posts)
}
module.exports = deletePost


