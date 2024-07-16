/* eslint-disable no-console */
// For merging output into the example
const log = console.log;
console.log = function () {
  log.apply(console, arguments);
  log("\u0001");
};

// Actual example starts here
// ---<snip>---
import { deepAplus } from "../dist/index.mjs";

// Create a promise that returns a value (for demonstration purposes)
function P(value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), 1));
}

console.log(await deepAplus(2));
// console.log-output
console.log(await deepAplus(P(2)));
// console.log-output

console.log(await deepAplus({ a: 1, b: P(2) }));
// console.log-output

console.log(await deepAplus({ a: 1, b: [2, P(3)] }));
// console.log-output

console.log(await deepAplus({ a: 1, b: { c: 2, d: P(3) } }));
// console.log-output

// Nesting promises
console.log(await deepAplus({ a: 1, b: P([2, P(3)]) }));
// console.log-output

console.log(await deepAplus({ a: 1, b: P([2, P(3)]) }));
// console.log-output

console.log(await deepAplus({ a: 1, b: P({ c: 2, d: P(3) }) }));
// console.log-output

// does not dive into classes in order to preserve their functionality
class A {
  a = 2;
  b = P(3);
}

console.log(await deepAplus(new A()));
// console.log-output)

// ---</snip>---
