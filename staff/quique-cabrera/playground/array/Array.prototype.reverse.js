console.log('TEST Array.prototype.reverse')

console.log('CASE reverse array order')

var elements = new Array
elements[0] = 'H2O'
elements[1] = 'CO2'
elements[2] = 'NO2'
elements[3] = 'CU2S'

console.log('elements:', elements)
//elements: [ 'H2O', 'CO2', 'NO2', 'CU2S' ]

var newOrder = elements.reverse()
console.log('New Order', newOrder)
//New Order [ 'CU2S', 'NO2', 'CO2', 'H2O' ]

console.log('elements:', elements)
//New Order [ 'CU2S', 'NO2', 'CO2', 'H2O' ]