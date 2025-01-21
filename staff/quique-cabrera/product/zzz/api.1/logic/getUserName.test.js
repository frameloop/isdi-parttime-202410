import getUserName from './getUserName.js'

try {
    const name = getUserName('abc123')

    console.log(name)
} catch (error) {
    console.error(error)
}