console.log('TEST Array.prototype.splice')

console.log('CASE  insert element in array')

const notes = ['Do', 'Re', 'Fa', 'Sol', 'Si']
notes.splice(2, 0, 'Mi')
console.log(notes)

// Array ["Do", "Re", "Mi", "Fa", "Sol", "Si"]

console.log('CASE  insert & remove element in array')

notes.splice(5, 1, 'La')
console.log(notes)
//Array ["Do", "Re", "Mi", "Fa", "Sol", "La"]