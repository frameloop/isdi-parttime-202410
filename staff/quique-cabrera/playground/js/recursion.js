/*

var cuenta = function(min, max) {
    console.log(min)

    if (min < max) {
        cuenta(min + 1, max)
    }
}
cuenta(1, 5)

function cuenta(min, max) {
    console.log(min)

    if (min < max) {
        cuenta(min + 1, max)
    }
}
cuenta(1, 5)

*/

function cuenta(min, max) {
    console.log(min)

    if (min < max)
        cuenta(min + 1, max)
}
cuenta(1, 5)


