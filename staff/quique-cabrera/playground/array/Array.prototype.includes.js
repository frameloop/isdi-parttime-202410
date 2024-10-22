console.log('TEST Array.prototype.includes')

console.log('CASE determine whether an arrya incluides element or not')

var motoGp = new Array
motoGp[0] = 'Jorge Martin'
motoGp[1] = 'Pedro Acosta'
motoGp[2] = 'Alex Marquez'
motoGp[3] = 'Maverick Viñales'
motoGp[4] = 'Joan Mir'
motoGp[5] = 'Pol Espargaró'
motoGp[6] = 'Dani Pedrosa'
console.log(motoGp.includes('Maverick Viñales'))
//true
console.log(motoGp.includes('Valentino Rossi'))
//false
