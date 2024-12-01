var root = document.body.querySelector('#root')

var rasca = new Rasca

root.appendChild(rasca.container)
rasca.setXY(100, 20)

var pica = new Pica

root.appendChild(pica.container)
pica.setXY(400, 20)