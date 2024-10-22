console.log('TEST Array.prototype.indexOf')

console.log('CASE isntace return the first index at which a given element')

var char = new Array
char[0] = 'Hommer'
char[1] = 'Marge'
char[2] = 'Maggie'
char[3] = 'Bart'
char[4] = 'Lisa'
char[5] = 'Maggie'

console.log(char.indexOf('Bart'))
// 3

console.log(char.indexOf('Maggie', 4))
// 5

console.log(char.indexOf('Apu'))
// -1

