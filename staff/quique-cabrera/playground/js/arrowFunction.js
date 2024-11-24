// single line standar function (one param)
var hiFun1 = function(name) {return 'Hi, ' + name}
console.log(hiFun1('Edu'))
// Hi, Edu

// single line arrow function (one param) --> Podemos omitir los () del parámetro y los {} y el "return" de la función
var hiArrowFun1 = name => 'Hi, ' + name
console.log(hiArrowFun1('Edu'))
// Hi, Edu

// single line standard function (two params)
var sumFun2 = function(a, b) { return a + b }
console.log(sumFun2(1, 1))
// 2

// single line arrow function (two params) --> Podemos omitir los {} y el "return" de la función
var sumArrowFun2 = (a, b) => a + b
console.log(sumArrowFun2(2, 3))
// 5

// multiline standard function (two params)
var sumFun3 = function(a, b) {
    var c = a + b
    return c
}
console.log(sumFun3(1, 2))
// 3

// multiline arrow function (two params)
var sumArrowFun3 = (a, b) => {
    var c = a + b
    return c
}
console.log(sumArrowFun3(2, 2))
// 4