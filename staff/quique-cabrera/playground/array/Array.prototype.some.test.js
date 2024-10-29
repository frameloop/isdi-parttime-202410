console.log('TEST Array.prtotype.some')

console.log('CASE check car exists in array')

var cars = [
    { brand: 'ferrari', model: 'enzo' },
    { brand: 'fiat', model: 'punto' },
    { brand: 'seat', model: 'ibiza' }
]

var check = cars.some(function (car) {
    // if (car.brand === 'fiat')
    //     return true

    // return false

    return car.brand === 'fiat'
})

console.log(check)
//true

console.log('CASE check car no exists in array')

var cars = [
    { brand: 'ferrari', model: 'enzo' },
    { brand: 'fiat', model: 'punto' },
    { brand: 'seat', model: 'ibiza' }
]

var check = cars.some(function (car) {
    // if (car.brand === 'Tesla')
    //     return true

    // return false

    return car.brand === 'Tesla'
})

console.log(check)
//false