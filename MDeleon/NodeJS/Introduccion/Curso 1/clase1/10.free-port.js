const net = require('node:net')

function findAvailablePort (desiredPort) {
  return new Promise((resolve, reject) => {
    const server = net.createServer()

    server.listen(desiredPort, () => {
      const { port } = server.address()
      server.close(() => {
        resolve(port)
      })
    })

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        findAvailablePort(0).then(port => resolve(port))
      } else {
        reject(err)
      }
    })
  })
}

module.exports = { findAvailablePort }

// Código para probar la función findAvailablePort
findAvailablePort(1234).then(port => {
  console.log(`Puerto disponible encontrado: ${port}`)
}).catch(err => {
  console.error(`Error al encontrar un puerto disponible: ${err}`)
})
