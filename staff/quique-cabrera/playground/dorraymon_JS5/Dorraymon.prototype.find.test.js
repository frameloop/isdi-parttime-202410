function Dorraymon() {
    this.length = 0
}

Dorraymon.prototype.find = function (condition) {
    for (var i = 0; i < this.length; i++) {
        var element = this[i]

        var fulfills = condition(element)

        if (fulfills) return element
    }

    //return underfined
}

console.log('TEST Dorraymon.prototype.find')

console.log('CASE find sponge bob in characters')

var characters = new Dorraymon
characters[0] = { name: 'Mickey Mouse', icon: '🐭' }
characters[1] = { name: 'Twety', icon: '🐥' }
characters[2] = { name: 'Sponge Bob', icon: '🧽' }
characters[3] = { name: 'Coyote', icon: '🦊' }
characters.length = 4

var character = characters.find(function (check) {
    return check.name === 'Sponge Bob'
})

console.log(character)
// { name: 'Sponge Bob', icon: '🧽' }

console.log('CASE find pink panter in characters')

var characters = new Dorraymon
characters[0] = { name: 'Mickey Mouse', icon: '🐭' }
characters[1] = { name: 'Twety', icon: '🐥' }
characters[2] = { name: 'Sponge Bob', icon: '🧽' }
characters[3] = { name: 'Coyote', icon: '🦊' }
characters.length = 4

var character = characters.find(function (check) {
    return check.name === 'Pink Panther'
})

console.log(character)
// undefined