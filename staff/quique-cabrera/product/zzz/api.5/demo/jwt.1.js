import jwt from 'jsonwebtoken'

var secret = 'el padre de mi abuela tenia una doble vida'

var userId = 'abc123'

var token = jwt.sign({ sub: userId }, secret)

// console.log(token)

// var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhYmMxMjMiLCJpYXQiOjE3MzgxNzk2NzJ9.8JQLF6w0Nvtx7J_-RWrTdq8jl3WU90hr83hpOryNYhI'

var firstDotIndex = token.indexOf('.')
//console.log(firstDotIndex)

var headerB64 = token.slice(0, firstDotIndex)
//console.log(headerB64)

var headerJSON = atob(headerB64)
// console.log(headerJSON)
// {"alg":"HS256","typ":"JWT"}

var lastDotIndex = token.lastIndexOf('.')
//console.log(lastDotIndex)

var payloadB64 = token.slice(firstDotIndex + 1, lastDotIndex)
//console.log(payloadB64)

var payloadJSON = atob(payloadB64)
//console.log(payloadJSON)

var payload = JSON.parse(payloadJSON)
//console.log(payload)
//var sub = payload.sub

var { sub } = payload
console.log(sub)