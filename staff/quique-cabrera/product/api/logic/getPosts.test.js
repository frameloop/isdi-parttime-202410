import getPosts from './getPosts.js'

try {
    const posts = getPosts('m2w92r8h10')

    console.log(posts)
} catch (error) {
    console.error(error)
}