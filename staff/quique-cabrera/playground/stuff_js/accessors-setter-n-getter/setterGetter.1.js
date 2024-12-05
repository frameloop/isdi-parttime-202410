var pikachu = {
    set name(name) {
        this.__name__ = name.toUpperCase()
    },

    get name() {
        return this.__name__
    }
}

pikachu.name = 'piKachU'

//console.log(peter)
console.log(pikachu.name)