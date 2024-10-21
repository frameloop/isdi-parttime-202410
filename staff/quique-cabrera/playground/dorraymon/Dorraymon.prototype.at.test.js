function Dorraymon() {
    this.length = 0

    Dorraymon.prototype.at = function (index) {
        if (index < 0) {
            var newIndex = this.length + index
            return this[newIndex]
        } else return this[index]
    }

    console.log('TEST Dorraymon.prototype.at')

    console.log('CASE get car at index 3')

    var cars = new Dorraymon
    cars[0] = 'lambo'
    cars[1] = 'f350'
    cars[2] = '911'
    cars[3] = 'm5'
    cars[4] = 'hummer'
    cars.length = 5
    var car = cars.at(3)
    console.log(car)
// m5
