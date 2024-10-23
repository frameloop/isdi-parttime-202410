console.log('TEST Array.prototype.pop')

console.log('CASE remove the last element from array and return that element')

var part = new Array
part[0] = 'cylinder'
part[1] = 'air filter'
part[2] = 'exhaust pipe'
part[3] = 'battery'
part[4] = 'carburator'
part[5] = 'tomato'

var fruit = part.pop()

console.log(part)
//['cylinder', 'air filter', 'exhaust pipe', 'battery', 'carburator']
console.log(fruit)
//tomato

