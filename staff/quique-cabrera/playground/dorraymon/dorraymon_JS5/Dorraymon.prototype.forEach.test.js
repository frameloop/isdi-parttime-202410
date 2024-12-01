function Dorraymon() {
    Dorraymon.length = 0
}

Dorraymon.prototype.forEach = function (condition) {
    for (var i = 0; i < this.length; i++)
        return this[i]
}

var motoGp = new Dorraymon
motoGp[0] = { rider: 'Jorge Martin', team: 'Ducati' }
motoGp[1] = { rider: 'Pedro Acosta', team: 'RedBull' }
motoGp[2] = { rider: 'Alex Marquez', team: 'Gresini' }
motoGp[3] = { rider: 'Maverick Viñales', team: 'Aprilia' }
motoGp[4] = { rider: 'Joan Mir', team: 'Repsol' }
motoGp[5] = { rider: 'Pol Espargaró', team: 'GASGAS' }
motoGp[6] = { rider: 'Dani Pedrosa', team: 'RedBull' }
motoGp.length = 7


var list = motoGp.forEach(function (name) {
    console.log(name.rider)
})

console.log(list)