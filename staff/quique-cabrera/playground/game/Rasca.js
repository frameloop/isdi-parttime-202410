// var raca = new Rasca

function Rasca() {
    Thing.call(this, document.createElement('div'))

    this.setSize(310, 320)

    var rascaImg = document.createElement('img')
    rascaImg.src = 'images/rasca.png'
    rascaImg.style.width = '200px'
    rascaImg.style.position = 'absolute'
    rascaImg.style.zIndex = 1
    rascaImg.style.left = '20px'
    rascaImg.style.top = '140px'
    this.container.appendChild(rascaImg)

    var rascaHeadImg = document.createElement('img')
    rascaHeadImg.src = 'images/rascaHead.png'
    rascaHeadImg.style.width = '300px'
    rascaHeadImg.style.rotate = '15deg'
    rascaHeadImg.style.position = 'absolute'
    rascaHeadImg.style.zIndex = 2
    rascaHeadImg.style.left = '20px'
    rascaHeadImg.style.top = '10px'
    this.container.appendChild(rascaHeadImg)

    var rascaHeadUngryImg = document.createElement('img')
    rascaHeadUngryImg.src = 'images/rascaHeadUngry.png'
    rascaHeadUngryImg.style.width = '300px'
    rascaHeadUngryImg.style.rotate = '25deg'
    rascaHeadUngryImg.style.position = 'absolute'
    rascaHeadUngryImg.style.zIndex = 3
    rascaHeadUngryImg.style.left = '20px'
    rascaHeadUngryImg.style.top = '10px'

    var rascaArmImg = document.createElement('img')
    rascaArmImg.src = 'images/rascaArm.png'
    rascaArmImg.style.width = '205px'
    rascaArmImg.style.position = 'absolute'
    rascaArmImg.style.zIndex = 4
    rascaArmImg.style.left = '20px'
    rascaArmImg.style.top = '37px'

    var STEP = 10

    document.addEventListener('keydown', function (event) {
        if (event.key === 's') {
            this.container.removeChild(rascaImg)
            this.container.appendChild(rascaArmImg)
            this.container.removeChild(rascaHeadImg)
            this.container.appendChild(rascaHeadUngryImg)
        } else if (event.key === 'a') {
            this.container.removeChild(rascaArmImg)
            this.container.appendChild(rascaImg)
            this.container.removeChild(rascaHeadUngryImg)
            this.container.appendChild(rascaHeadImg)
        } else if (event.key === 'ArrowUp')
            this.moveY(- STEP)
        else if (event.key === 'ArrowDown')
            this.moveY(+ STEP)
        else if (event.key === 'ArrowLeft') {
            this.moveX(- STEP)
            this.container.style.transform = 'scaleX(-1)' // Voltear hacia la izquierda
        } else if (event.key === 'ArrowRight') {
            this.moveX(+ STEP)
            this.container.style.transform = 'scaleX(1)' // Voltear hacia la izquierda
        }
    }.bind(this))
}

Rasca.prototype = Object.create(Thing.prototype)
Rasca.prototype.constructor = Rasca