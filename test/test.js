const { API_KEY } = process.env
const { CoinbaseCommerce } = require('../')

describe('coinbase-commerce', () => {

  let client

  before(() => {
    if (!API_KEY) throw new Error('Must run tests with a valid api key')
    client = new CoinbaseCommerce({ apiKey: API_KEY })
  })

  describe('charges', () => {
    it('should list', () => {
      return client.charges.list()
    })

    it('should create a charge', () => {
      return client.charges.create({ pricing_type: 'no_price' })
    })
  })

  describe('checkouts', () => {
    it('should list', () => {
      return client.checkouts.list()
    })
  })

  describe('events', () => {
    it('should list', () => {
      return client.events.list()
    })
  })
})
