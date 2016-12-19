// For merging output into the
var log = console.log
console.log = function () {
  log.apply(console, arguments)
  log('\u0001')
}

// Actual example starts here
// ---<snip>---
var Q = require('q')
var deep = require('../')(Q.Promise)

// Create a promise that returns a value (for demonstration purposes)
function P(value) {
  return Q.delay(1).then(function () {
    return value
  })
}

deep(2).then(console.log) // console.log-output
  .then(() => deep(P(2)))
  .then(console.log) // console.log-output

  .then(() => deep({a: 1, b: P(2)}))
  .then(console.log) // console.log-output

  .then(() => deep({a: 1, b: [2, P(3)]}))
  .then(console.log) // console.log-output

  .then(() => deep({a: 1, b: {c: 2, d: P(3)}}))
  .then(console.log) // console.log-output

  // Nesting promises
  .then(() => deep({a: 1, b: P([2, P(3)])}))
  .then(console.log) // console.log-output

  .then(() => deep({a: 1, b: P([2, P(3)])}))
  .then(console.log) // console.log-output

  .then(() => deep({a: 1, b: P({c: 2, d: P(3)})}))
  .then(console.log) // console.log-output

  // does not dive into classes in order to preserve their functionality
  .then(() => {
    function A() {
      this.a = 2;
      this.b = P(3)
    }
    return deep(new A())
  })
  .then(console.log) // console.log-output)

// ---</snip>---
