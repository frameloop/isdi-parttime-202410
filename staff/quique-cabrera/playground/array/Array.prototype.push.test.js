console.log('TEST Array.prototype.push')

console.log('CASE add character to sponge bob characters')

var chars = new Array
chars[0] = 'Sponge Bob'
chars[1] = 'Patrick Star'
chars[2] = 'Squidward Tentacles'
chars[3] = 'Gary the Snail'

var length = chars.push('Sheldon Plankton')

console.log(length)
// 5
console.log(chars)
// ['Sponge Bob', 'Patrick Star', 'Squidward Tentacles', 'Gary the Snail', 'Sheldon Plankton']

var tags = new Array
tags[0] = 'html'
tags[1] = 'head'
tags[2] = 'body'
var length = tags.push('h1', 'p', 'table', 'img', 'video')
console.log(length)
//8
console.log(tags)
//[ 'html', 'head','body', 'h1', 'p',    'table', 'img',  'video' ] 

console.log('CASE add various arrays into nums')

var nums = new Array
var length = nums.push([1, 2, 3], [4, 5], [6], [], [7], [8, 9, 10, 11])
console.log(length)
// 6
console.log(nums)
// [[1 ,2, 3], [4,5], [6], [], [7], [8, 9, 10, 11]]
console.log(nums[0][2])
// 3
var length = nums[0].push(12, 13)
// [1, 2, 3, 12, 13]
console.log(nums.length)
// 6
console.log(nums)
// [[1, 2, 3, 12, 13], [4,5], [6], [], [7], [8, 9, 10, 11]]
var length = nums[1].push([14, 15, 16])
console.log(length)
// 3
console.log(nums[1])
// [ 4, 5, [ 14, 15, 16 ] ]
console.log(nums.length)
// 6
console.log(nums)
// [ [ 1, 2, 3, 12, 13 ], [ 4, 5, [ 14, 15, 16 ] ], [ 6 ],  [],  [ 7 ], [ 8, 9, 10, 11 ]]
console.log(nums[1][2][1])
// 15