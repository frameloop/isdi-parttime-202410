var homeView = document.createElement('main')

if (isUserLoggedIn())
    body.appendChild(homeView)

var homeTitle = document.createElement('h2')
homeTitle.innerText = 'Home'
homeView.appendChild(homeTitle)

var homeUser = document.createElement('h3')
homeUser.innerText = 'Hello, User!'
homeView.appendChild(homeUser)

if (isUserLoggedIn()) {
    var name = getUserName()

    homeUser.innerText = 'Hello, ' + name + '!'
}

var homeLogoutButton = document.createElement('button')
homeLogoutButton.innerText = 'Logout'
homeView.appendChild(homeLogoutButton)

homeLogoutButton.onclick = function () {
    logoutUser()

    body.removeChild(homeView)
    body.appendChild(loginView)
}

var homePostAddButton = document.createElement('button')
homePostAddButton.innerText = 'Create Post'
homeView.appendChild(homePostAddButton)

homePostAddButton.onclick = function () {

    homeView.removeChild(homePosts)
    homeView.appendChild(homeCreatePost)
}


var homePosts = document.createElement('section')
homeView.appendChild(homePosts)

if (isUserLoggedIn()) {
    var posts = getPosts()

    homePosts.innerHTML = ''

    posts.forEach(function (post) {
        var homePost = document.createElement('article')
        homePosts.appendChild(homePost)

        var postAuthor = document.createElement('h3')
        postAuthor.innerText = post.author.username
        homePost.appendChild(postAuthor)

        var postImage = document.createElement('img')
        postImage.src = post.image
        homePost.appendChild(postImage)

        var postCaption = document.createElement('p')
        postCaption.innerText = post.text
        homePost.appendChild(postCaption)

        var postDate = document.createElement('time')
        postDate.innerText = post.date
        homePost.appendChild(postDate)
    })
}


var homeCreatePost = document.createElement('section')

var homeCreatePostTitle = document.createElement('h3')
homeCreatePostTitle.innerText = 'Create Post'
homeCreatePost.appendChild(homeCreatePostTitle)

var homeCreatePostForm = document.createElement('form')
homeCreatePost.appendChild(homeCreatePostForm)

var homeCreatePostImageLabel = document.createElement('label')
homeCreatePostImageLabel.innerText = 'Image'
homeCreatePostImageLabel.htmlFor = 'image'
homeCreatePostForm.appendChild(homeCreatePostImageLabel)

var homeCreatePostImageImput = document.createElement('input')
homeCreatePostImageImput.type = 'url'
homeCreatePostImageImput.id = 'image'
homeCreatePostForm.appendChild(homeCreatePostImageImput)

var homeCreatePostTextLabel = document.createElement('label')
homeCreatePostTextLabel.innerText = 'Caption'
homeCreatePostTextLabel.htmlFor = 'text'
homeCreatePostForm.appendChild(homeCreatePostTextLabel)

var homeCreatePostTextImput = document.createElement('input')
homeCreatePostTextImput.type = 'text'
homeCreatePostTextImput.id = 'text'
homeCreatePostForm.appendChild(homeCreatePostTextImput)

var homeCreatePostSubmitButton = document.createElement('button')
homeCreatePostSubmitButton.innerText = 'Share'
homeCreatePostSubmitButton.type = 'submit'
homeCreatePostForm.appendChild(homeCreatePostSubmitButton)

homeCreatePostForm.onsubmit = function (event) {
    event.preventDefault()

    var image = homeCreatePostImageImput.value
    var text = homeCreatePostTextImput.value

    try {
        createPost(image, text)

        homeCreatePostForm.reset()

        homeView.removeChild(homeCreatePost)
        homeView.appendChild(homePosts)

        var posts = getPosts()

        homePosts.innerHTML = ''

        posts.forEach(function (post) {
            var homePost = document.createElement('article')
            homePosts.appendChild(homePost)

            var postAuthor = document.createElement('h3')
            postAuthor.innerText = post.author.username
            homePost.appendChild(postAuthor)

            var postImage = document.createElement('img')
            postImage.src = post.image
            homePost.appendChild(postImage)

            var postText = document.createElement('p')
            postText.innerText = post.text
            homePost.appendChild(postText)

            var postDate = document.createElement('time')
            postDate.innerText = post.date
            homePost.appendChild(postDate)
        })
    } catch (error) {
        alert(error.message)

        console.error(error)
    }
}

