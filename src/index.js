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
  constructor({ apiKey, version = '2018-05-20' }) {
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
   * Verifies a webhook signature against shared secret
   *
   * @method verifyWebhookSignature
   * @param {String} signature
   * @param {String} body
   * @param {String} sharedSecret
   * @return {Boolean}
   */
  verifyWebhookSignature(signature, body, sharedSecret) {
    let text = (typeof body === 'string' || body instanceof String) ? body : JSON.stringify(body)
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
      get: id => this._get(`/${name}/${id}`),
      list: params => this._get(`/${name}`, { params }),
      create: data => this._post(`/${name}`, { data }),
      update: (id, data) => this._put(`/${name}/${id}`, { data })
    }
  }

  /**
   * @private
   * @method _get
   * @param {String} url
   * @param {Object} [params]
   * @return {Promise}
   */
  _get(url, params = {}) {
    return this._client.get(url, { params })
      .then(res => res.data)
  }

  /**
   * @private
   * @method _post
   * @param {String} url
   * @param {Object} [data]
   * @return {Promise}
   */
  _post(url, data = {}) {
    return this._client.post(url, { data })
      .then(res => res.data)
  }

  /**
   * @private
   * @method _put
   * @param {String} url
   * @param {Object} [data]
   * @return {Promise}
   */
  _put(url, data = {}) {
    return this._client.put(url, { data })
      .then(res => res.data)
  }
}

module.exports = CoinbaseCommerce
