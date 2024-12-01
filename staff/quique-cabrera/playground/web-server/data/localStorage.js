const fs = require('fs')

const localStorage = {
    get users() {
        const users = fs.readFileSync('./data/users.json', 'utf8')

        return users
    },

    set users(users) {
        fs.writeFileSync('./data/users.json', users)
    }
}

module.exports = localStorage