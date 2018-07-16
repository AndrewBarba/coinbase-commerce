# Coinbase Commerce

[![npm version](https://badge.fury.io/js/coinbase-commerce.svg)](https://badge.fury.io/js/coinbase-commerce)
[![wercker status](https://app.wercker.com/status/994eb933a3d4130e70dd47eed4788568/s/master "wercker status")](https://app.wercker.com/project/byKey/994eb933a3d4130e70dd47eed4788568)

Node.js library for [commerce.coinbase.com](https://commerce.coinbase.com)

## Usage

Create a Commerce client:

```javascript
const { CoinbaseCommerce } = require('coinbase-commerce')

let client = new CoinbaseCommerce({
  apiKey: '1234abcd-1234-abcd-1234-abcd1234abcd',
  version: '2018-03-22' // optional
})
```

## Charges

### List

```javascript
let results = await client.charges.list()
```

### Get

```javascript
let result = await client.charges.get('66BEOV2A')
```

### Create

```javascript
let result = await client.charges.create(options)
```

### Request

```javascript
let result = await client.charges.request('post', '/resolve')
```

## Checkouts

### List

```javascript
let results = await client.checkouts.list()
```

### Get

```javascript
let result = await client.checkouts.get('1234abcd-1234-abcd-1234-abcd1234abcd')
```

### Create

```javascript
let result = await client.checkouts.create({})
```

### Update

```javascript
let result = await client.checkouts.update('1234abcd-1234-abcd-1234-abcd1234abcd', updates)
```

### Delete

```javascript
let result = await client.checkouts.delete('1234abcd-1234-abcd-1234-abcd1234abcd')
```

## Events

### List

```javascript
let results = await client.events.list()
```

### Get

```javascript
let result = await client.events.get('66BEOV2A')
```

## Webhooks

### Verify Signature

```javascript
// `body` can be a String, Buffer or Object
let isVerified = client.verifyWebhookSignature(signature, body, sharedSecret)
```
