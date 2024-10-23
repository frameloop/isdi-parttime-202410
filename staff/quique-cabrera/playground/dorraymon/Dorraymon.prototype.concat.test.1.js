function Dorraymon() {
    this.length = 0
}

Dorraymon.prototype.concat = function (element) {
    for (var i = 0; i < this.length; i++) {
        result = this[i]
        result.length++
    }

    return this.length
}