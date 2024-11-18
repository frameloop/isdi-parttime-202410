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