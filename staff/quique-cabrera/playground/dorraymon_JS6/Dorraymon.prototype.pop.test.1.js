function Dorraymon() {
    this.length = 0
}

console.log('TEST Dorraymon.prototype.pop')

Dorraymon.prototype.pop = function (input) {
    this.length--
    var lastItem = this[this.length]
    delete this[this.length]
    return lastItem
}


console.log('CASE remove the last element from Dorraymon and return that element')

var part = new Dorraymon
part[0] = 'cylinder'
part[1] = 'air filter'
part[2] = 'exhaust pipe'
part[3] = 'battery'
part[4] = 'carburator'
part[5] = 'tomato'
part.length = 6

var fruit = part.pop()

console.log(part)
//['cylinder', 'air filter', 'exhaust pipe', 'battery', 'carburator']
console.log(fruit)
//tomato
