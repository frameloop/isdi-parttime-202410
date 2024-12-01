console.log('TEST Dorraymon.prototype.some')

function Dorraymon() {
    this.length = 0
}

Dorraymon.prototype.some = function (condition) {
    for (var i = 0; i < this.length; i++) {
        var element = this[i]

        var found = condition(element)

        if (found) return true
    }
    return false
}

console.log('CASE check car brand exists in Dorraymon')

var cars = new Dorraymon
cars[0] = { brand: 'ferrari', model: 'enzo' }
cars[1] = { brand: 'fiat', model: 'punto' }
cars[2] = { brand: 'seat', model: 'ibiza' }
cars.length = 3

var check = cars.some(function (car) {
    return car.brand === 'fiat'
})

console.log(check)
//true

console.log('CASE check car brand not exists in Dorraymon')

var cars = new Dorraymon
cars[0] = { brand: 'ferrari', model: 'enzo' }
cars[1] = { brand: 'fiat', model: 'punto' }
cars[2] = { brand: 'seat', model: 'ibiza' }
cars.length = 3

var check = cars.some(function (car) {
    return car.brand === 'tesla'
})

console.log(check)
//false

