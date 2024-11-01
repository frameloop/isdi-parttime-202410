var posts = []

posts.push({
    id: 'm2w92r8h13',
    author: 'Homer Simpson',
    image: 'https://acortar.link/KFg2wd',
    text: 'it was me?',
    date: new Date().toISOString()
})

posts.push({
    id: 'm2w92r8h44',
    author: 'Marge Simpson',
    image: 'https://acortar.link/NXV0IC',
    text: 'Hi!',
    date: new Date().toISOString()
})

localStorage.posts = JSON.stringify(posts)

var users = []

users.push({
    id: 'm2w92r8h09',
    name: 'Homer Simpson',
    email: 'homer@simpson.com',
    username: 'homer',
    password: '123123123'
})

users.push({
    id: 'm2w92r8h10',
    name: 'Marge Simpson',
    email: 'marge@simpson.com',
    username: 'marge',
    password: '123123123'
})

localStorage.users = JSON.stringify(users)
