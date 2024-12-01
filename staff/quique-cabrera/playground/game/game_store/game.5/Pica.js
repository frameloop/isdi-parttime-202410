// var raca = new Pica

function Pica() {
    Thing.call(this, document.createElement('div'))

    this.setSize(310, 320)

    var picaImg = document.createElement('img')
    picaImg.src = 'images/pica.png'
    picaImg.style.width = '200px'
    picaImg.style.position = 'absolute'
    picaImg.style.zIndex = 1
    picaImg.style.left = '20px'
    picaImg.style.top = '160px'
    this.container.appendChild(picaImg)

    var picaHeadImg = document.createElement('img')
    picaHeadImg.src = 'images/picaHead.png'
    picaHeadImg.style.width = '200px'
    picaHeadImg.style.rotate = '-15deg'
    picaHeadImg.style.position = 'absolute'
    picaHeadImg.style.zIndex = 2
    picaHeadImg.style.left = '20px'
    picaHeadImg.style.top = '10px'
    this.container.appendChild(picaHeadImg)

    var picaHeadUngryImg = document.createElement('img')
    picaHeadUngryImg.src = 'images/picaHeadUngry.png'
    picaHeadUngryImg.style.width = '190px'
    picaHeadUngryImg.style.rotate = '-45deg'
    picaHeadUngryImg.style.position = 'absolute'
    picaHeadUngryImg.style.zIndex = 3
    picaHeadUngryImg.style.left = '18px'
    picaHeadUngryImg.style.top = '10px'

    var picaArmImg = document.createElement('img')
    picaArmImg.src = 'images/picaArm.png'
    picaArmImg.style.width = '214px'
    picaArmImg.style.position = 'absolute'
    picaArmImg.style.zIndex = 4
    picaArmImg.style.left = '9px'
    picaArmImg.style.top = '54px'


    this.upKey = '8'
    this.downKey = '2'
    this.leftKey = '4'
    this.rightKey = '6'


    var STEP = 10

    this.attack = false

    document.addEventListener('keydown', function (event) {
        if (event.key === this.upKey)
            this.moveY(-STEP)
        else if (event.key === this.downKey)
            this.moveY(+STEP)
        else if (event.key === this.leftKey) {
            this.moveX(-STEP)
            this.container.style.transform = 'scaleX(1)' // Voltear hacia la izquierda
        } else if (event.key === this.rightKey) {
            this.moveX(+STEP)
            this.container.style.transform = 'scaleX(-1)' // Voltear hacia la izquierda
        }
    }.bind(this))

    document.addEventListener('keydown', function (event) {
        if (event.key === '+')
            if (this.attack) {
                this.container.removeChild(picaArmImg)
                this.container.appendChild(picaImg)
                this.container.removeChild(picaHeadUngryImg)
                this.container.appendChild(picaHeadImg)

                this.attack = false
            } else {
                this.container.removeChild(picaImg)
                this.container.appendChild(picaArmImg)
                this.container.removeChild(picaHeadImg)
                this.container.appendChild(picaHeadUngryImg)

                this.attack = true
            }
    }.bind(this))
}

Pica.prototype = Object.create(Thing.prototype)
Pica.prototype.constructor = Pica

Pica.prototype.setKeys = function (upKey, downKey, leftKey, rightKey) {
    this.upKey = upKey
    this.downKey = downKey
    this.leftKey = leftKey
    this.rightKey = rightKey
}