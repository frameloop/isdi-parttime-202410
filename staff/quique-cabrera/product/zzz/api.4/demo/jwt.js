import jwt from 'jsonwebtoken'

var secret = 'el padre de mi abuela tenia una doble vida'

var userId = 'abc123'

// CREATE TOKEN

var token = jwt.sign({ sub: userId }, secret)

// console.log(token)

function extractPayloadFromToken(token) {
    var firstDotIndex = token.indexOf('.')
    var lastDotIndex = token.lastIndexOf('.')

    var payloadB64 = token.slice(firstDotIndex + 1, lastDotIndex)
    var payloadJSON = atob(payloadB64)
    var payload = JSON.parse(payloadJSON)

    return payload
}

// var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhYmMxMjMiLCJpYXQiOjE3MzgxNzk2NzJ9.8JQLF6w0Nvtx7J_-RWrTdq8jl3WU90hr83hpOryNYhI'

// var payload = extractPayloadFromToken(token)
// var { sub } = payload
// console.log(sub)

// VALIDATE TOKEN

// corrupt token
var payloadJSON = '{"sub":"xyz567","iat":1738179672}'
var payloadB64 = btoa(payloadJSON)
var token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${payloadB64}.8JQLF6w0Nvtx7J_-RWrTdq8jl3WU90hr83hpOryNYhI`
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ4eXo1NjciLCJpYXQiOjE3MzgxNzk2NzJ9.8JQLF6w0Nvtx7J_-RWrTdq8jl3WU90hr83hpOryNYhI
console.log(token)

try {
    var payload = jwt.verify(token, secret)
    var { sub } = payload
    console.log(sub)
} catch (error) {
    console.error('ERROR', error)
}