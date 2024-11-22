function Dorraymon() {
    this.length = 0
}

console.log('TEST Dorraymon.prototype.splice')

Dorraymon.prototype.splice = function (index, pop, element) {
    this[index - 1] = element
    // if (pop > 0)
    //     delete this[pop]
    return this
}

console.log('CASE  insert element in Dorraymon')

var notes = new Dorraymon
notes[0] = 'Do'
notes[1] = 'Re'
notes[2] = 'Fa'
notes[3] = 'Sol'
notes[4] = 'Si'
notes.length = 5

notes.splice(3, 0, 'Mi')
console.log(notes)

notes.splice(5, 0, 'La')
console.log(notes)
// Dorray ["Do", "Re", "Mi", "Fa", "Sol", "Si"]