const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

function getConnection () {
  prisma.$connect().then(() => {
    console.info('[Database] Conectado com sucesso')
  }).catch((e) => {
    console.log(`Ocorreu um erro ao tentar se conectar com a database: ${e}`)
  })
}

module.exports = { getConnection, prisma }
