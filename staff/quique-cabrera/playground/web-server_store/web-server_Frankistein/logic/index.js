const loginUser = require('./loginUser')
const isUserLoggedIn = require('./isUserLoggedIn')
const getUserName = require('./getUserName')
const logoutUser = require('./logoutUser')
const registerUser = require('./registerUser')
const getPosts = require('./getPosts')
const createPost = require('./createPost')
const deletePost = require('./deletePost')

const logic = {
    loginUser,
    isUserLoggedIn,
    getUserName,
    logoutUser,
    registerUser,
    getPosts,
    createPost,
    deletePost
}

module.exports = logic