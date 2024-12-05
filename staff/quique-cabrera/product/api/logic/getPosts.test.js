import getPosts from './getPosts.js'

try {
    const posts = getPosts('m41rjo7ulg')

    console.log(posts)
} catch (error) {
    console.error(error)
}