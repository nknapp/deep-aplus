# deep-aplus

[![NPM version](https://img.shields.io/npm/v/deep-aplus.svg)](https://npmjs.com/package/deep-aplus)
[![Github Actions Status](https://github.com/nknapp/deep-aplus/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/nknapp/deep-aplus/actions/workflows/ci.yml)

> Resolve a whole structure of promises

This small library is a promise-library agnostic function that resolves a whole structure
or objects, arrays, promises and values to a single promise in which the whole structure is
resolved.

Unlike other libraries like [q-deep](https://npmjs.com/package/q-deep), [resolve-deep](https://npmjs.com/package/resolve-deep) and
[swear](https://npmjs.com/package/swear), this library is designed to work without dependencies to any promise library
(and also without any other dependencies).

**Note: There is no cycle check. You have to check for cycles yourself before passing the
structure to the function**

# Installation

```
npm install deep-aplus
```

## Usage

The following example demonstrates how to use this module:

```js
import { deepAplus } from "../dist/index.mjs";

// Create a promise that returns a value (for demonstration purposes)
function P(value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), 1));
}

console.log(await deepAplus(2));
// 2
console.log(await deepAplus(P(2)));
// 2

console.log(await deepAplus({ a: 1, b: P(2) }));
// { a: 1, b: 2 }

console.log(await deepAplus({ a: 1, b: [2, P(3)] }));
// { a: 1, b: [ 2, 3 ] }

console.log(await deepAplus({ a: 1, b: { c: 2, d: P(3) } }));
// { a: 1, b: { c: 2, d: 3 } }

// Nesting promises
console.log(await deepAplus({ a: 1, b: P([2, P(3)]) }));
// { a: 1, b: [ 2, 3 ] }

console.log(await deepAplus({ a: 1, b: P([2, P(3)]) }));
// { a: 1, b: [ 2, 3 ] }

console.log(await deepAplus({ a: 1, b: P({ c: 2, d: P(3) }) }));
// { a: 1, b: { c: 2, d: 3 } }

// does not dive into classes in order to preserve their functionality
class A {
  a = 2;
  b = P(3);
}

console.log(await deepAplus(new A()));
// A { a: 2, b: Promise { <pending> } })
```

# License

`deep-aplus` is published under the MIT-license.

See [LICENSE.md](LICENSE.md) for details.

# Release-Notes

For release notes, see [CHANGELOG.md](CHANGELOG.md)

# Contributing guidelines

See [CONTRIBUTING.md](CONTRIBUTING.md).
