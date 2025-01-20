const http = require('http')
const server = http.createServer((req, res) => {
  res.end('Hola mundo')
})

server.listen(0, () => {
  console.log(`server listen on port http://localhost:${server.address().port}`)
})
