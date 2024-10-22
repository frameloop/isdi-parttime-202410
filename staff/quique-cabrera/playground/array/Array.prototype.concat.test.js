console.log('TEST Array.prototype.concat')

console.log('CASE merge two arrays')

var sea = new Array
sea[0] = 'shark'
sea[1] = 'octopus'
sea[2] = 'Sponge'
sea[3] = 'Whale'

var forest = new Array
forest[0] = 'elephant'
forest[1] = 'bear'
forest[2] = 'fox'
forest[3] = 'lion'

var animals = sea.concat(forest);

console.log(animals)
