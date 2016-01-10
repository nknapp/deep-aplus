# deep-aplus

> Resolve a whole structure of promises, library agnostic

This small library is a promise-library agnostic function that resolves a whole structure
or objects, arrays, promises and values to a single promise in which the whole structure is 
resolved.

**Note: There is no cycle check. You have to check for cycles yourself before passing the
  structure to the function**
# Installation

```
npm install deep-aplus
```

## Usage

The following example demonstrates how to use this module:

```js
var Q = require('q')
var deep = require('deep-aplus')(Q.Promise)

// Create a promise that returns a value (for demonstration purposes)
function P (value) {
  return Q.delay(1).then(function () {
    return value
  })
}



deep(2).done(console.log) // 2
deep(P(2)).done(console.log)  // 2
deep({a: 1, b: P(2)}).done(console.log) // { a: 1, b: 2 }
deep({a: 1, b: [ 2, P(3)]}).done(console.log); // { a: 1, b: [ 2, 3 ] }
deep({a: 1, b: { c: 2, d: P(3)}}).done(console.log); // { a: 1, b: { c: 2, d: 3 } }

// Nesting promises
deep({a: 1, b: P([ 2, P(3)])}).done(console.log); // { a: 1, b: [ 2, 3 ] }
deep({a: 1, b: P([ 2, P(3)])}).done(console.log); // { a: 1, b: [ 2, 3 ] }
deep({a: 1, b: P({ c: 2, d: P(3)})}).done(console.log); // { a: 1, b: { c: 2, d: 3 } }
```


##  API-reference

<a name="module_index"></a>
### index ⇒ <code>function</code>
Creates a `deep(value)`-function using the provided constructor to
create the resulting promise and promises for intermediate steps.
The `deep` function returns a promise for the resolution of an arbitrary
structure passed as parameter

**Returns**: <code>function</code> - a function that returns a promise (of the provided class)
  for a whole object structure  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| Promise | <code>function</code> | class in which promises are created |




## License

`deep-aplus` is published under the MIT-license. 
See [LICENSE.md](LICENSE.md) for details.

## Release-Notes
 
For release notes, see [CHANGELOG.md](CHANGELOG.md)
 
## Contributing guidelines

See [CONTRIBUTING.md](CONTRIBUTING.md).