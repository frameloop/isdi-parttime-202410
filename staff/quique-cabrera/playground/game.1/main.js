var root = document.body.querySelector('#root')
// root.style.width = '100vw'; // Para ocupar todo el ancho de la ventana
// root.style.height = '100vh'; // Para ocupar todo el alto de la ventana
// root.style.backgroundColor = 'chocolate'
// root.style.backgroundImage = 'url("images/background.png")' // Ruta a la imagen de fondo
// root.style.backgroundSize = 'cover' // Ajusta el tamaño para cubrir todo el fondo
// root.style.backgroundPosition = 'center' // Centra la imagen de fondo
// root.style.backgroundRepeat = 'no-repeat' // Evita que la imagen se repita


var rasca = document.createElement('div')
rasca.style.width = '310px'
rasca.style.height = '320px'
rasca.style.position = 'absolute'
// rasca.style.backgroundColor = 'red'
root.appendChild(rasca)

var rascaImg = document.createElement('img')
rascaImg.src = 'images/rasca.png'
rascaImg.style.width = '200px'
rascaImg.style.position = 'absolute'
rascaImg.style.zIndex = 1
rascaImg.style.left = '20px'
rascaImg.style.top = '140px'
rasca.appendChild(rascaImg)

var rascaHeadImg = document.createElement('img')
rascaHeadImg.src = 'images/rascaHead.png'
rascaHeadImg.style.width = '300px'
rascaHeadImg.style.rotate = '15deg'
rascaHeadImg.style.position = 'absolute'
rascaHeadImg.style.zIndex = 2
rascaHeadImg.style.left = '20px'
rascaHeadImg.style.top = '10px'
rasca.appendChild(rascaHeadImg)

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
// rasca.appendChild(rascaArmImg)

var rascaCoords = {
    x: 40,
    y: 20
}

rasca.style.left = rascaCoords.x + 'px'
rasca.style.top = rascaCoords.y + 'px'

var STEP = 10

document.addEventListener('keydown', function (event) {
    if (event.key === 's') {
        rasca.removeChild(rascaImg)
        rasca.appendChild(rascaArmImg)
        rasca.removeChild(rascaHeadImg)
        rasca.appendChild(rascaHeadUngryImg)
    } else if (event.key === 'a') {
        rasca.removeChild(rascaArmImg)
        rasca.appendChild(rascaImg)
        rasca.removeChild(rascaHeadUngryImg)
        rasca.appendChild(rascaHeadImg)
    } else if (event.key === 'ArrowUp') {
        rascaCoords.y -= STEP

        rasca.style.top = rascaCoords.y + 'px'
    } else if (event.key === 'ArrowDown') {
        rascaCoords.y += STEP

        rasca.style.top = rascaCoords.y + 'px'
    } else if (event.key === 'ArrowLeft') {
        rascaCoords.x -= STEP

        rasca.style.left = rascaCoords.x + 'px'
        rasca.style.transform = 'scaleX(-1)' // Voltear hacia la izquierda
    } else if (event.key === 'ArrowRight') {
        rascaCoords.x += STEP

        rasca.style.left = rascaCoords.x + 'px'
        rasca.style.transform = 'scaleX(1)' // Voltear hacia la izquierda
    }
})


//////PICA
var pica = document.createElement('div')
pica.style.width = '310px'
pica.style.height = '320px'
pica.style.position = 'absolute'
// pica.style.backgroundColor = 'red'
root.appendChild(pica)

var picaImg = document.createElement('img')
picaImg.src = 'images/pica.png'
picaImg.style.width = '200px'
picaImg.style.position = 'absolute'
picaImg.style.zIndex = 1
picaImg.style.left = '20px'
picaImg.style.top = '160px'
pica.appendChild(picaImg)

var picaHeadImg = document.createElement('img')
picaHeadImg.src = 'images/picaHead.png'
picaHeadImg.style.width = '200px'
picaHeadImg.style.rotate = '-15deg'
picaHeadImg.style.position = 'absolute'
picaHeadImg.style.zIndex = 2
picaHeadImg.style.left = '20px'
picaHeadImg.style.top = '10px'
pica.appendChild(picaHeadImg)

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
// pica.appendChild(picaArmImg)

var picaCoords = {
    x: 400,
    y: 20
}

pica.style.left = picaCoords.x + 'px'
pica.style.top = picaCoords.y + 'px'

var STEP = 10

document.addEventListener('keydown', function (event) {
    if (event.key === 'z') {
        pica.removeChild(picaImg)
        pica.appendChild(picaArmImg)
        pica.removeChild(picaHeadImg)
        pica.appendChild(picaHeadUngryImg)
    } else if (event.key === 'x') {
        pica.removeChild(picaArmImg)
        pica.appendChild(picaImg)
        pica.removeChild(picaHeadUngryImg)
        pica.appendChild(picaHeadImg)
    } else if (event.key === '8') {
        picaCoords.y -= STEP

        pica.style.top = picaCoords.y + 'px'
    } else if (event.key === '2') {
        picaCoords.y += STEP

        pica.style.top = picaCoords.y + 'px'
    } else if (event.key === '4') {
        picaCoords.x -= STEP

        pica.style.left = picaCoords.x + 'px'
        pica.style.transform = 'scaleX(1)' // Voltear hacia la izquierda
    } else if (event.key === '6') {
        picaCoords.x += STEP

        pica.style.left = picaCoords.x + 'px'
        pica.style.transform = 'scaleX(-1)' // Voltear hacia la izquierda
    }
})