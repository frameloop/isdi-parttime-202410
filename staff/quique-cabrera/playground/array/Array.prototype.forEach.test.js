console.log('TEST Array.prototype.forEach')

console.log('CASE list of moto gp riders')

var motoGp = [
    { rider: 'Jorge Martin' },
    { rider: 'Pedro Acosta' },
    { rider: 'Alex Marquez' },
    { rider: 'Maverick Viñales' },
    { rider: 'Joan Mir' },
    { rider: 'Pol Espargaró' },
    { rider: 'Dani Pedrosa' },
]

motoGp.forEach(function (list) {
    console.log(list.rider)
})