console.log('TEST Array.prototype.find')

console.log('CASE find sponge bob in characters')

var charracte = [
    { name: 'Mickey Mouse', icon: '🐭' },
    { name: 'Tweety', icon: '🐥' },
    { name: 'Sponge Bob', icon: '🧽' },
    { name: 'Coyote', icon: '🦊' }
]

var charracter = charracters.find(function (charracter) {
    // if (character.name === 'Pink Panther')
    //     return true

    // return false

    return charracter.name === 'Sponge Bob'
})

console.log(character)
// { name: 'Sponge Bob', icon: '🧽' }

console.log('CASE find Pink Panther in characters')

var charracte = [
    { name: 'Mickey Mouse', icon: '🐭' },
    { name: 'Tweety', icon: '🐥' },
    { name: 'Sponge Bob', icon: '🧽' },
    { name: 'Coyote', icon: '🦊' }
]

var character = charracters.find(function (character) {
    return character.name === 'Pink Panther'
})

console.log(character)
//undefined

