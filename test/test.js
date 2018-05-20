const { API_KEY } = process.env
const { CoinbaseCommerce } = require('../src')

describe('coinbase-commerce', () => {

  let instance

  before(() => {
    if (!API_KEY) throw new Error('Must run tests with a valid api key')
    instance = new CoinbaseCommerce({ apiKey: API_KEY })
  })

  describe('charges', () => {
    it('should list', () => {
      return instance.charges.list()
    })
  })

  describe('checkouts', () => {
    it('should list', () => {
      return instance.checkouts.list()
    })
  })

  describe('events', () => {
    it('should list', () => {
      return instance.events.list()
    })
  })
})
