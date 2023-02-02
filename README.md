# rateLimitedRequestQueue

A utility function for handling HTTP requests in a rate-limited manner. It helps to control the rate at which requests are made, so that your API usage stays within the limits set by the API provider.

## Installation

You can install rateLimitedRequestQueue using npm:

```bash
npm install ratelimitedrequestqueue
```

## Usage

```javascript
import rateLimitedRequestQueue from "ratelimitedrequestqueue";

const limitedRequest = rateLimitedRequestQueue(10, 1000, true);

for (let x = 0; x < 100; x++) {
  limitedRequest(async () => {
    console.log(x);
  }).then(() => console.log("finished" + x));
  console.log(x);
}
```

## API

### rateLimitedRequestQueue(maxRequestsPerInterval, interval, [evenlySpaced = false])

#### maxRequestsPerInterval

Type: `number`

Maximum number of requests that can be made in an interval.

#### interval

Type: `number`

Time duration in milliseconds for an interval.

#### evenlySpaced

Type: `boolean`

Specifies if all requests should be evenly spaced out within the interval. Defaults to `false`.
