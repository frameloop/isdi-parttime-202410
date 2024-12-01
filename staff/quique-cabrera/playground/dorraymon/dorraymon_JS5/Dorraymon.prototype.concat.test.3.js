console.log('TEST Dorraymon.prototype.concat')

console.log('CASE 1 merge two animals class')

function Dorraymon() {
    this.length = 0
}

Dorraymon.prototype.concat = function (value) {
    var result = new Dorraymon

    //this   -> Dorraymon {0: 'elephant', 1: 'bear', 2: 'fox', 3: 'lion', length: 4 }
    //value  -> Dorraymon {0: 'elephant', 1: 'bear', 2: 'fox', 3: 'lion', length: 4 }
    //result -> Dorraymon { length: 0 }

    result[0] = this[0]   //result -> Dorraymon { 0: 'shark', length: 0}
    result.length++       //result -> Dorraymon { 0: 'shark', length: 1}

    result[1] = this[1]   //result -> Dorraymon { 0: 'shark', 1: 'octopus', length: 1}
    result.length++       //result -> Dorraymon { 0: 'shark', 1: 'octopus', length: 2}

    result[2] = this[2]   //result -> Dorraymon { 0: 'shark', 1: 'octopus', 2: 'Sponge', length: 2}
    result.length++       //result -> Dorraymon { 0: 'shark', 1: 'octopus', 2: 'Sponge', length: 3}

    result[3] = this[3]   //result -> Dorraymon { 0: 'shark', 1: 'octopus', 2: 'Sponge', 3:'Whale', length: 3}
    result.length++       //result -> Dorraymon { 0: 'shark', 1: 'octopus', 2: 'Sponge', 3:'Whale', length: 4}

    result[4] = value[0]  //result -> Dorraymon { 0: 'shark', 1: 'octopus', 2: 'Sponge', 3:'Whale', 4: 'elephant', length: 4}
    result.length++       //result -> Dorraymon { 0: 'shark', 1: 'octopus', 2: 'Sponge', 3:'Whale', 4: 'elephant', length: 5}

    result[5] = value[1]  //result -> Dorraymon { 0: 'shark', 1: 'octopus', 2: 'Sponge', 3:'Whale', 4: 'elephant', 5: 'bear', length: 5}
    result.length++       //result -> Dorraymon { 0: 'shark', 1: 'octopus', 2: 'Sponge', 3:'Whale', 4: 'elephant', 5: 'bear', length: 6}

    result[6] = value[2]  //result -> Dorraymon { 0: 'shark', 1: 'octopus', 2: 'Sponge', 3:'Whale', 4: 'elephant', 5: 'bear', 6: 'fox', length: 6}
    result.length++       //result -> Dorraymon { 0: 'shark', 1: 'octopus', 2: 'Sponge', 3:'Whale', 4: 'elephant', 5: 'bear', 6: 'fox', length: 7}

    result[7] = value[3]  //result -> Dorraymon { 0: 'shark', 1: 'octopus', 2: 'Sponge', 3:'Whale', 4: 'elephant', 5: 'bear', 6: 'fox', 7: 'lion', length: 7}
    result.length++       //result -> Dorraymon { 0: 'shark', 1: 'octopus', 2: 'Sponge', 3:'Whale', 4: 'elephant', 5: 'bear', 6: 'fox', 7: 'lion', length: 8}

    return result
}

var sea = new Dorraymon
sea[0] = 'shark'
sea[1] = 'octopus'
sea[2] = 'Sponge'
sea[3] = 'Whale'
sea.length = 4
console.log(sea)
//Dorraymon { 0: 'shark', 1: 'octopus', 2: 'Sponge', 3:'Whale', length: 4 }
console.log(sea.length)
//4

var land = new Dorraymon
land[0] = 'elephant'
land[1] = 'bear'
land[2] = 'fox'
land[3] = 'lion'
land.length = 4
console.log(land)
//Dorraymon {0: 'elephant', 1: 'bear', 2: 'fox', 3: 'lion', length: 4 }
console.log(land.length)
//4

var sky = new Dorraymon
sky[0] = 'crow'
sky[1] = 'eagle'
sky[2] = 'sparow'
sky[3] = 'duck'
sky.length = 4
console.log(sky)
//Dorraymon {0: 'crow', 1: 'eagle', 2: 'sparow', 3: 'duck', length: 4 }
console.log(sky.length)
//4

console.log('Resul in a new Dorraymon')

var animals = sea.concat(land);
console.log(animals)
//Dorraymon {0: 'shark', 1: 'octopus', 2: 'Sponge', 3:'Whale', 4: 'elephant', 5: 'bear', 6: 'fox', 7: 'lion', length: 8 }
console.log(animals.length)
//8