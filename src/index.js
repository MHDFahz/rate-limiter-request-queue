"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
Object.defineProperty(exports, "__esModule", { value: true });
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
function rateLimitedRequestQueue(
  maxRequestsPerInterval,
  interval,
  evenlySpaced
) {
  var _this = this;
  if (evenlySpaced === void 0) {
    evenlySpaced = false;
  }
  /**
   * If all requests should be evenly spaced, adjust to suit.
   */
  if (evenlySpaced) {
    interval = interval / maxRequestsPerInterval;
    maxRequestsPerInterval = 1;
  }
  var queue = [];
  var lastIntervalStart = 0;
  var numRequestsPerInterval = 0;
  var timeout;
  /**
   * Gets called at a set interval to remove items from the queue.
   * This is a self-adjusting timer, since the browser's setTimeout is highly inaccurate.
   */
  var dequeue = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var intervalEnd, now, _i, _a, callback;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            intervalEnd = lastIntervalStart + interval;
            now = Date.now();
            /**
             * Adjust the timer if it was called too early.
             */
            if (now < intervalEnd) {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
              timeout !== undefined && clearTimeout(timeout);
              timeout = setTimeout(dequeue, intervalEnd - now);
              return [2 /*return*/];
            }
            lastIntervalStart = now;
            numRequestsPerInterval = 0;
            (_i = 0), (_a = queue.splice(0, maxRequestsPerInterval));
            _b.label = 1;
          case 1:
            if (!(_i < _a.length)) return [3 /*break*/, 4];
            callback = _a[_i];
            numRequestsPerInterval++;
            return [4 /*yield*/, callback()];
          case 2:
            _b.sent();
            _b.label = 3;
          case 3:
            _i++;
            return [3 /*break*/, 1];
          case 4:
            if (queue.length) {
              timeout = setTimeout(dequeue, interval);
            } else {
              timeout = undefined;
            }
            return [2 /*return*/];
        }
      });
    });
  };
  return function (fn) {
    return __awaiter(_this, void 0, void 0, function () {
      var _this = this;
      return __generator(this, function (_a) {
        return [
          2 /*return*/,
          new Promise(function (resolve, reject) {
            return __awaiter(_this, void 0, void 0, function () {
              var callback, now;
              var _this = this;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    callback = function () {
                      return __awaiter(_this, void 0, void 0, function () {
                        var _a, error_1;
                        return __generator(this, function (_b) {
                          switch (_b.label) {
                            case 0:
                              _b.trys.push([0, 2, , 3]);
                              _a = resolve;
                              return [4 /*yield*/, fn()];
                            case 1:
                              _a.apply(void 0, [_b.sent()]);
                              return [3 /*break*/, 3];
                            case 2:
                              error_1 = _b.sent();
                              reject(error_1);
                              return [3 /*break*/, 3];
                            case 3:
                              return [2 /*return*/];
                          }
                        });
                      });
                    };
                    now = Date.now();
                    if (
                      timeout === undefined &&
                      now - lastIntervalStart > interval
                    ) {
                      lastIntervalStart = now;
                      numRequestsPerInterval = 0;
                    }
                    if (!(numRequestsPerInterval++ < maxRequestsPerInterval))
                      return [3 /*break*/, 2];
                    return [4 /*yield*/, callback()];
                  case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                  case 2:
                    queue.push(callback);
                    if (timeout === undefined) {
                      timeout = setTimeout(
                        dequeue,
                        lastIntervalStart + interval - now
                      );
                    }
                    _a.label = 3;
                  case 3:
                    return [2 /*return*/];
                }
              });
            });
          }),
        ];
      });
    });
  };
}

module.exports = rateLimitedRequestQueue;
exports.default = rateLimitedRequestQueue;
