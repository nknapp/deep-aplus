// For merging output into the
var log = console.log;
console.log = function() {
  log.apply(console,arguments)
  log("\u0001")
}

// Actual example starts here
// ---<snip>---
var Q = require('q')
var deep = require('../')(Q.Promise)

// Create a promise that returns a value (for demonstration purposes)
function P (value) {
  return Q.delay(1).then(function () {
    return value
  })
}



deep(2).done(console.log) // console.log-output
deep(P(2)).done(console.log)  // console.log-output
deep({a: 1, b: P(2)}).done(console.log) // console.log-output
deep({a: 1, b: [ 2, P(3)]}).done(console.log); // console.log-output
deep({a: 1, b: { c: 2, d: P(3)}}).done(console.log); // console.log-output

// Nesting promises
deep({a: 1, b: P([ 2, P(3)])}).done(console.log); // console.log-output
deep({a: 1, b: P([ 2, P(3)])}).done(console.log); // console.log-output
deep({a: 1, b: P({ c: 2, d: P(3)})}).done(console.log); // console.log-output

// ---</snip>---
