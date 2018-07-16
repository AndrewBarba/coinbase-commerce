
export class CoinbaseCommerce {
  constructor(options: { apiKey: string, version?: string })
  readonly charges: RestResource
  readonly checkouts: RestResource
  readonly events: RestResource
  verifyWebhookSignature(signature: string, body: object, sharedSecret: string): boolean
}

declare interface RestResource {
  request(method: string, path: string, options: { data?: object, params?: object }): Promise<object>
  get(id: string): Promise<object>
  list(params?: object): Promise<object>
  create(data?: object): Promise<object>
  update(id: string, data?: object): Promise<object>
  delete(id: string): Promise<object>
}
