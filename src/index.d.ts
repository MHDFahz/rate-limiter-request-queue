/**
 * @function rateLimitedRequestQueue
 * @param {number} maxRequestsPerInterval - Maximum number of requests that can be made in an interval.
 * @param {number} interval - Time duration in milliseconds for an interval.
 * @param {boolean} [evenlySpaced=false] - Specifies if all requests should be evenly spaced out within the interval.
 * @returns {function} A function that takes in a callback function that returns a Promise and returns another Promise.
 *
 * This function creates a queue for handling HTTP requests in a rate-limited manner. It accepts the maximum number of requests that can be made in a time interval and the time duration of the interval. Optionally, you can also specify if all requests should be evenly spaced out within the interval.
 * The returned function accepts a callback function that returns a Promise and returns another Promise. The provided callback will be executed only if the number of requests in the current interval is less than the maximum number of requests allowed in the interval. If the number of requests in the current interval has reached the maximum, the callback will be added to the queue and executed in the next interval.
 *
 * @example
 * const limitedRequest = rateLimitedRequestQueue(10, 1000, true);
 * for (let x = 0; x < 100; x++) {
 *   limitedRequest(async () => {
 *     console.log(x);
 *   }).then(() => console.log("finished" + x));
 *   console.log(x);
 * }
 */
declare function rateLimitedRequestQueue(
  maxRequestsPerInterval: number,
  interval: number,
  evenlySpaced?: boolean
): (fn: () => Promise<unknown>) => Promise<unknown>;

export default rateLimitedRequestQueue;
