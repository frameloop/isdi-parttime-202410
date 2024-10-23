console.log('TEST Dorraymon.prototype.concat')

function Dorraymon() {
    this.length = 0
}

Dorraymon.prototype.concat = function () {
    var result = new Dorraymon

    for (var i = 0; i < this.length; i++) {
        result[i] = this[i]
        result.length++
    }

    for (var a = 0; a < arguments.length; a++) {
        var value = arguments[a]
        for (var i = 0; i < value.length; i++) {
            result[result.length] = value[i]
            result.length++
        }
    }

    return result
}

var sea = new Dorraymon
sea[0] = 'shark'
sea[1] = 'octopus'
sea[2] = 'Sponge'
sea[3] = 'Whale'
sea.length = 4
console.log(sea)
//Dorraymon { 0: 'shark', 1: 'octopus', 2: 'Sponge', 3:'Whale', length: 4 }
console.log(sea.length)
//4

var land = new Dorraymon
land[0] = 'elephant'
land[1] = 'bear'
land[2] = 'fox'
land[3] = 'lion'
land.length = 4
console.log(land)
//Dorraymon { 0: 'elephant', 1: 'bear', 2: 'fox', 3: 'lion', length: 4 }
console.log(land.length)
//4

var sky = new Dorraymon
sky[0] = 'crow'
sky[1] = 'eagle'
sky[2] = 'sparow'
sky[3] = 'duck'
sky.length = 4
console.log(sky)
//Dorraymon { 0: 'crow', 1: 'eagle', 2: 'sparow', 3: 'duck', length: 4 }
console.log(sky.length)
//4

console.log('CASE 1 merge two animals class')

var animals = sea.concat(land);
console.log(animals)
//Dorraymon { 0: 'shark', 1: 'octopus', 2: 'Sponge', 3:'Whale', 4: 'elephant', 5: 'bear', 6: 'fox', 7: 'lion', length: 8 }
console.log(animals.length)
//8

console.log('CASE 2 merge three animals class')

var wildLife = sea.concat(land, sky)
console.log(wildLife)
//Dorraymon { 0:'shark', 1: 'octopus', 2: 'Sponge', 3: 'Whale', 4: 'elephant', 6: 'bear', 6: 'fox', 7: 'lion', 8: 'crow', 9:'eagle', 10: 'sparow', 11: 'duck', length: 12}
console.log(wildLife.length)
//12