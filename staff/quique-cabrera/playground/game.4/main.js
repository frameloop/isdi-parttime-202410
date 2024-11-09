var root = new Thing(document.body.querySelector('#root'))

var rasca = new Rasca
root.add(rasca)
rasca.setXY(100, 20)

var pica = new Pica
root.add(pica)
pica.setXY(400, 20)