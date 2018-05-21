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
    return {
      get: id => this._request('get', `/${name}/${id}`),
      list: params => this._request('get', `/${name}`, { params }),
      create: data => this._request('post', `/${name}`, { data }),
      update: (id, data) => this._request('put', `/${name}/${id}`, { data }),
      delete: (id, params) => this._request('delete', `/${name}/${id}`, { params })
    }
  }

  /**
   * @private
   * @method _get
   * @param {String} url
   * @param {Object} [params]
   * @return {Promise}
   */
  _request(method, url, { data, params }) {
    return this._client.request({ method, url, data, params })
      .then(res => res.data)
  }
}

module.exports = {
  CoinbaseCommerce
}
