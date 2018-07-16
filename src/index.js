const axios = require('axios')
const crypto = require('crypto')

/**
 * @class CoinbaseCommerce
 */
class CoinbaseCommerce {

  /**
   * @constructor
   * @param {String} options.apiKey
   * @param {String} [options.version]
   */
  constructor({ apiKey, version = '2018-03-22' }) {
    if (!apiKey) throw new Error('apiKey is required')

    let clientOptions = {
      baseURL: 'https://api.commerce.coinbase.com',
      headers: {
        'X-CC-Api-Key': apiKey,
        'X-CC-Version': version
      }
    }

    this._client = axios.create(clientOptions)
    this._charges = this._buildRestResource('charges')
    this._checkouts = this._buildRestResource('checkouts')
    this._events = this._buildRestResource('events')
  }

  /**
   * @param {RestResource} charges
   */
  get charges() {
    return this._charges
  }

  /**
   * @param {RestResource} checkouts
   */
  get checkouts() {
    return this._checkouts
  }

  /**
   * @param {RestResource} events
   */
  get events() {
    return this._events
  }

  /**
   * Verifies a webhook signature against shared secret
   *
   * @method verifyWebhookSignature
   * @param {String} signature
   * @param {String} body
   * @param {String} sharedSecret
   * @return {Boolean}
   */
  verifyWebhookSignature(signature, body, sharedSecret) {
    let text = (typeof body === 'string' || body instanceof String || Buffer.isBuffer(body)) ? body : JSON.stringify(body)
    let hash = crypto.createHmac('sha256', sharedSecret).update(text).digest('hex')
    return hash === signature
  }

  /**
   * @private
   * @method _buildRestResource
   * @param {String} name
   * @return {RestResource}
   */
  _buildRestResource(name) {
    let request = async (method, path = '', { data = {}, params = {} } = {}) => {
      if (!method) throw new Error('Method is required')
      return this._request(method, `/${name}${path}`, { params, data })
    }
    return {
      request: () => request(...arguments),
      get: id => request('get', `/${id}`),
      list: params => request('get', '', { params }),
      create: data => request('post', '', { data }),
      update: (id, data) => request('put', `/${id}`, { data }),
      delete: (id, params) => request('delete', `/${id}`, { params })
    }
  }

  /**
   * @private
   * @method _get
   * @param {String} url
   * @param {Object} [params]
   * @return {Promise}
   */
  async _request(method, url, { data, params }) {
    let res = await this._client.request({ method, url, data, params })
    return res.data
  }
}

module.exports = {
  CoinbaseCommerce
}
