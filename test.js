const fs =  require('fs')
const getRates = require('./rates')

fs.readFile('./test.txt', 'utf8', (err, data) => {
    console.log(data.toString())
})
console.log(getRates())