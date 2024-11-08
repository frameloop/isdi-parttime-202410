function Dorraymon() {
    this.length = 0
}

Dorraymon.prototype.push = function (element) {
    for (var i = 0; i < arguments.length; i++) {
        var argument = arguments[i]

        this[this.length] = element
        this.length++
    }

    return this.length
}

console.log('TEST Dorraymon.prototype.push')

console.log('CASE add charracter to sponge bob characters')

var chars = new Dorraymon
chars[0] = 'Sponge Bob'
chars[1] = 'Patrick Star'
chars[2] = 'Squidward Tentacles'
chars[3] = 'Gary the Snail'
chars.length = 4
var length = chars.push('Sheldon Plankton')
console.log(length)
// 5
console.log(chars)
// Dorraymon {0: 'Sponge Bob', 1: 'Patrick Star', 2: 'Squidward Tentacles', 3: 'Gary the Snail', 4: 'Sheldon Plankton', length: 5}

var tags = new Dorraymon
tags[0] = 'html'
tags[1] = 'head'
tags[2] = 'body'
tags.length = 3
var length = tags.push('h1', 'p', 'table', 'img', 'video')
console.log(length)
//8
console.log(tags)
// Dorraymon { 0: 'html', 1: 'head', 2:'body', 3:'h1', 4:'p', 5:'table', 6:'img',  7:'video' } 