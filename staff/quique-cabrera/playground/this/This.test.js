var a = ['coche', 'perro', 'casa', 'gato']



window.name = 'Window'
window.image = '🫥'
var peter = { name: 'Peter', image: '🥵' }
var wendy = { name: 'Wendy', image: '🥶' }
peter.weapon = '🔫'
wendy.weapon = '👙'

function hello() {
    return this.image + ' ' + this.name + ': Hello!' + ' ' + this.weapon
}

/*console.log(hello())
console.log(hello.call(peter))
console.log(window.hello.call(peter))
console.log(hello.call(wendy))*/

wendy.hi = hello
peter.ciao = hello

a.name = 'caja'
a.image = '📦'
a.weapon = '💣'
a.hola = hello
a[10] = peter
peter.partner = wendy
wendy.partner = peter

/*console.log(wendy.hi())
console.log(peter.ciao())
console.log(a.hola())
console.log(a.length)
console.log(a.hola())
console.dir(a)
console.log(a[10].ciao())*/


/*var f =function a(){
    return function b(){
        return [,,function c(){
            return {
                o:{
                    hi: function(){
                        return 'hi!'
                    }
                }
            }
        }]
    }
}

console.log(f()()[2]().o.hi())*/

var g = ['hola', 1, true, {
},
    {
        0: [, , , , {
            b: function () {
                return
                {
                    c: function() {
                        return [function () { return 'yo' }]
                    }
                }
            }
        }]

    }]


console.log(g[4][0][4])