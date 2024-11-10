function MovableThing(container) {
    Thing.call(this, container)

    var STEP = 10

    this.upKey = 'ArrowUp'
    this.downKey = 'ArrowDown'
    this.leftKey = 'ArrowLeft'
    this.rightKey = 'ArrowRight'

    document.addEventListener('keydown', function (event) {
        if (event.key === this.upKey)
            this.moveY(- STEP)
        else if (event.key === this.downKey)
            this.moveY(+ STEP)
        else if (event.key === this.leftKey) {
            this.moveX(- STEP)
            this.container.style.transform = 'scaleX(-1)' // Voltear hacia la izquierda
        } else if (event.key === this.rightKey) {
            this.moveX(+ STEP)
            this.container.style.transform = 'scaleX(1)' // Voltear hacia la izquierda
        }
    }.bind(this))
}

MovableThing.prototype = Object.create(Thing.prototype)
MovableThing.prototype.constructor = MovableThing


MovableThing.prototype.setKeys = function (upKey, downKey, leftKey, rightKey) {
    this.upKey = upKey
    this.downKey = downKey
    this.leftKey = leftKey
    this.rightKey = rightKey
}

Thing.prototype.move = function (dx, dy) {
    this.setXY(this.x + dx, this.y + dy)
}

Thing.prototype.moveX = function (dx) {
    this.move(dx, 0)
}

Thing.prototype.moveY = function (dy) {
    this.move(0, dy)
}
