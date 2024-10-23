console.log('TEST Array.prototype.concat')

var sea = new Array
sea[0] = 'shark'
sea[1] = 'octopus'
sea[2] = 'Sponge'
sea[3] = 'Whale'
console.log(sea)
//[ 'shark', 'octopus', 'Sponge', 'Whale' ]
console.log(sea.length)
4

var land = new Array
land[0] = 'elephant'
land[1] = 'bear'
land[2] = 'fox'
land[3] = 'lion'
console.log(land)
//[ 'elephant', 'bear', 'fox', 'lion' ]
console.log(land.length)
//4

var sky = new Array
sky[0] = 'crow'
sky[1] = 'eagle'
sky[2] = 'sparow'
sky[3] = 'duck'
console.log(sky)
//[ 'crow', 'eagle', 'sparow', 'duck' ]
console.log(sky.length)
//4

console.log('CASE 1 merge two animals class')

var animals = sea.concat(land);
console.log(animals)
//[ 'shark', 'octopus', 'Sponge', 'Whale', 'elephant', 'bear', 'fox', 'lion' ]
console.log(animals.length)
//8

console.log('CASE 2 merge three animals class')

var wildLife = sea.concat(land, sky)
console.log(wildLife)
//['shark', 'octopus', 'Sponge', 'Whale', 'elephant', 'bear', 'fox', 'lion', 'crow', 'eagle', 'sparow', 'duck']
console.log(wildLife.length)
//12

console.log('CASE 3 merge three animals class and string')
var party = sea.concat(land, sky, ' are going to party!')
console.log(party)
//['shark', 'octopus', 'Sponge', 'Whale', 'elephant', 'bear', 'fox', 'lion', 'crow', 'eagle', 'sparow', 'duck', ' are going to party!']
console.log(party.length)
//13
