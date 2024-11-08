function Dorraymon() {
    this.length = 0
}

console.log('TEST Dorraymon.prototype.reverse')


Dorraymon.prototype.reverse = function () {
    var input = new Dorraymon() // copy Dorraymon in another variable
    var count = this.length - 1 // capture the Dorraymon size to define i
    var newCount = 0 // create a new index
    for (var i = count; i >= 0; i--) {
        input[newCount] = this[i]
        newCount++
    }
    input.length = this.length
    return input
}


console.log('CASE reverse Dorraymon order')

var elements = new Dorraymon
elements[0] = 'H2O'
elements[1] = 'CO2'
elements[2] = 'NO2'
elements[3] = 'CU2S'
elements.length = 4

console.log('elements:', elements)
//elements: [ 'H2O', 'CO2', 'NO2', 'CU2S' ]

var newOrder = elements.reverse()
console.log('New Order', newOrder)
//New Order [ 'CU2S', 'NO2', 'CO2', 'H2O' ]

console.log('elements:', elements)
//New Order [ 'CU2S', 'NO2', 'CO2', 'H2O' ]
