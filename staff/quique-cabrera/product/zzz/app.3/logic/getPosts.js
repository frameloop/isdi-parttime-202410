function getPosts() {
    var post = JSON.parse(localStorage.posts)

    return post.reverse()
}