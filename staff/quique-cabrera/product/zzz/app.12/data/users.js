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
