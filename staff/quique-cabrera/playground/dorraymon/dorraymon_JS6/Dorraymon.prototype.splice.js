console.log('TEST Dorraymon prototype splice')

class Dorraymon {
    constructor() {
        this.length = 0
    }

    splice(start, deleteCount, ...items) {

        let merged = {} // Dorraymon final
        let index = 0 // Nuevo indice

        // Copiar elementos iniciales antes de start
        for (let i = 0; i< start; i ++){
        merged[index] = this[i]
        index++
        }

        //Insertar los nuevos elementos
        for (let i=0; i<items.length; i++){    
        merged[index] = items[i]
        index++
        }

        // Mover elementos existentes despues del borrado
        for (let i = start + deleteCount; i < this.length; i++) {
        merged[index] = this[i]
        index++
        }

        // Actualizar la logitud del Dorraymon
        merged.length = index

        // Paras el orden al Dorraymon
        for (let newIndex in merged){
        this[newIndex] = merged[newIndex]
        }

        return this
    }
}

console.log('CASE add abril and mayo in months')

{
    const months = new Dorraymon
    months[0] = 'january'
    months[1] = 'february'
    months[2] = 'march'
    months[3] = 'june'
    months[4] = 'july'
    months.length = 5

    months.splice(3, 0, 'april', 'may')
    // Dorraymon {0: 'january', 1: 'february', 2: 'march', 3: 'april', 4: 'may', 5: 'june', 6: 'july', length: 7}
}



