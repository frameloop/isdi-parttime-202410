function Dorraymon() {
    this.length = 0
}

console.log('TEST Dorraymon.prototype.includes')

Dorraymon.prototype.includes = function (input) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === input) {
            return true
        }
    } return false
}

console.log('CASE determine whether an Dorraymon incluides element or not')

var motoGp = new Dorraymon
motoGp[0] = 'Jorge Martin'
motoGp[1] = 'Pedro Acosta'
motoGp[2] = 'Alex Marquez'
motoGp[3] = 'Maverick Viñales'
motoGp[4] = 'Joan Mir'
motoGp[5] = 'Pol Espargaró'
motoGp[6] = 'Dani Pedrosa'
motoGp.length = 7

console.log(motoGp.includes('Maverick Viñales'))
//true

console.log(motoGp.includes('Valentino Rossi'))
//false
