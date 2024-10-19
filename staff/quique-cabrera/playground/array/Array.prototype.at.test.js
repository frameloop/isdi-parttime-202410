console.log('TEST Array.prototype.at')

console.log('CASE getelement at index 3')

//var cars = ['lambo', 'f350', '911', 'm5','hummer']
var cars = new Array
cars[0] = 'lambo'
cars[1] = 'f350'
cars[2] = '911'
cars[3] = 'm5'
cars[4] = 'hummer'
var car = cars.at(3)
console.log(car)
// m5

console.log('CASE get item at -10')

var cart = new Array
cart[0] = { brand: 'Adidas', model: 'Niza', size: 43, price: 70, quantity: 2 }
cart[1] = { brand: 'Puma', model: 'Gatito', size: 'L', price: 20, quantity: 3 }
cart[2] = { brand: 'Nike', model: 'Chachi', size: '44', price: 15, quantity: 6 }
var item = cart.at(-10)
console.log(item)
//undefined

console.log('CASE get item at 10')

var cart = new Array
cart[0] = { brand: 'Adidas', model: 'Niza', size: 43, price: 70, quantity: 2 }
cart[1] = { brand: 'Puma', model: 'Gatito', size: 'L', price: 20, quantity: 3 }
cart[2] = { brand: 'Nike', model: 'Chachi', size: 44, price: 12, quantity: 6 }
var item = cart.at(10)
console.log(item)