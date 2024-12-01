var root = new Thing(document.body.querySelector('#root'))

var rasca = new Rasca
root.add(rasca)
rasca.setXY(100, 20)

var rasca2 = new Rasca
rasca.setKeys('e', 'x', 's', 'd') // Setup Move Keys
rasca.setAttakKey('z')
root.add(rasca2)
rasca.setXY(170, 300)

var pica = new Pica
root.add(pica)
pica.setXY(400, 20)