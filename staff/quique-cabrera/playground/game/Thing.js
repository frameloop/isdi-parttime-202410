class Thing {
    constructor(container) {
        this.x = 0
        this.y = 0

        this.container = container
        this.container.style.position = 'absolute'
    }

    setSize(width, height) {
        this.container.style.width = width + 'px'
        this.container.style.height = height + 'px'
    }

    setXY(x, y) {
        this.x = x
        this.y = y

        this.container.style.left = this.x + 'px'
        this.container.style.top = this.y + 'px'
    }

    setX(x) {
        this.setXY(x, this.y)
    }

    setY(y) {
        this.setXY(this.x, y)
    }

    move(dx, dy) {
        this.setXY(this.x + dx, this.y + dy)
    }

    moveX(dx) {
        this.move(dx, 0)
    }

    moveY(dy) {
        this.move(0, dy)
    }

    add(thing) {
        this.container.appendChild(thing.container)
    }
}