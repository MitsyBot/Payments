const { prisma } = require('./prisma')
module.exports = class DbSet {
  constructor () {
    this.payments = prisma.Payments
  }

  static getInstance () {
    if (!this.instance) {
      this.instance = new DbSet()
    }
    return this.instance
  }
}
