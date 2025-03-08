node - e "console.log(JSON.parse(Buffer.from('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2NjNTkwMzM3YmUxM2VkMTE4YThiYmMiLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE3NDE0NDgyMTgsImV4cCI6MTc0MTQ1MTgxOH0.vO6lFhWLUq3J6t-dgX410xkCUWJ_9uo3n1lRVdb03RI'.split('.')[1], 'base64').toString()))"

// --expected-output--
// {
//     sub: '67cc590337be13ed118a8bbc',
//     role: 'customer',
//     iat: 1741448218,
//     exp: 1741451818
//   }