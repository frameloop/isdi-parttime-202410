import registerUser from './registerUser'
import loginUser from './loginUser'
import getUserId from './getUserId'
import getUserName from './getUserName'
import isUserLoggedIn from './isUserLoggedIn'
import logoutUser from './logoutUser'

import getPosts from './getPosts'
import createPost from './createPost'
import deletePost from './deletePost'

const logic = {
    registerUser,
    loginUser,
    getUserId,
    getUserName,
    isUserLoggedIn,
    logoutUser,

    getPosts,
    createPost,
    deletePost
}

export default logic