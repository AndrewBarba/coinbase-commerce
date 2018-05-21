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
  version: '2018-05-20' // optional
})
```

## Charges

### List

```javascript
client.charges.list()
  .then(results => {})
```

### Get

```javascript
client.charges.get('66BEOV2A')
  .then(result => {})
```

### Create

```javascript
client.charges.create({})
  .then(result => {})
```

## Checkouts

### List

```javascript
client.checkouts.list()
  .then(results => {})
```

### Get

```javascript
client.checkouts.get('1234abcd-1234-abcd-1234-abcd1234abcd')
  .then(result => {})
```

### Create

```javascript
client.checkouts.create({})
  .then(result => {})
```

### Update

```javascript
client.checkouts.update('1234abcd-1234-abcd-1234-abcd1234abcd', {})
  .then(result => {})
```

### Delete

```javascript
client.checkouts.delete('1234abcd-1234-abcd-1234-abcd1234abcd')
  .then(result => {})
```

## Events

### List

```javascript
client.events.list()
  .then(results => {})
```

### Get

```javascript
client.events.get('66BEOV2A')
  .then(result => {})
```

## Webhooks

### Verify Signature

```javascript
// `body` can be a String, Buffer or Object
let isVerified = client.verifyWebhookSignature(signature, body, sharedSecret)
```
