/*!
 * deep-aplus <https://github.com/nknapp/deep-aplus>
 *
 * Copyright (c) 2016 Nils Knappmeier.
 * Released under the MIT license.
 */

/* global describe */
/* global it */
// /* global xdescribe */
// /* global xit */

'use strict'

var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
var expect = chai.expect

var Q = require('q')
var deep = require('../')(Q.Promise)
var delay = function (value) {
  return Q.delay(1).then(function () {
    return value
  })
}

describe('deep-aplus:', function () {
  var spec = {
    simpleObject: {
      input: {
        a: 'a',
        b: delay('b')
      },
      output: {
        a: 'a',
        b: 'b'
      }
    },
    nestedObject: {
      input: {
        a: 'a',
        b: {c: delay('c')}
      },
      output: {
        a: 'a',
        b: {c: 'c'}
      }
    },
    nestedObjectPromise: {
      input: {
        a: 'a',
        b: delay({c: delay('c', 2)})
      },
      output: {
        a: 'a',
        b: {c: 'c'}
      }
    },
    simpleArray: {
      input: ['a', delay('b')],
      output: ['a', 'b']
    },
    nestedArray: {
      input: ['a', [delay('b')]],
      output: ['a', ['b']]
    },
    nestedArrayPromise: {
      input: ['a', delay(['b', delay('c', 2)])],
      output: ['a', ['b', 'c']]
    },
    nestedObjectInArray: {
      input: ['a', delay({
        'b': 'b',
        'c': delay('c', 2)
      })],
      output: ['a', {b: 'b', c: 'c'}]
    },
    nestedArrayInObject: {
      input: {
        a: 'a', b: delay(['b', delay('c', 2)])
      },
      output: {a: 'a', b: ['b', 'c']}
    },
    number: {
      input: 2,
      output: 2
    },
    arrayWithoutPromise: {
      input: [2, 3],
      output: [2, 3]
    },
    promise: {
      input: delay(2),
      output: 2
    },
    promiseWithNestedStuff: {
      input: delay([
        ['a', delay({
          'b': 'b',
          'c': delay('c', 2)
        })
        ], {
          a: 'a', b: delay(['b', delay('c', 2)])
        }]),
      output: [
        ['a', {b: 'b', c: 'c'}],
        {a: 'a', b: ['b', 'c']}
      ]
    }
  }

  Object.keys(spec).forEach(function (key) {
    it('should match spec "' + key + '"', function () {
      return expect(deep(spec[key].input)).to.eventually.deep.equal(spec[key].output)
    })
  })

  it('should reject the promise if any promise inside the structure is rejected', function () {
    var input = {
      a: 'a',
      b: delay('b').then(function () {
        throw new Error('Intented error')
      })
    }
    return expect(deep(input)).to.be.rejectedWith(Error)
  })

  it('should handle empty arrays correctly', function () {
    var input = []
    return expect(deep(input)).to.eventually.deep.equal([])
  })

  it('should handle empty objects correctly', function () {
    var input = {}
    return expect(deep(input)).to.eventually.deep.equal({})
  })

  it('should not remove functions defined in the prototype', function () {
    var input = {
      a: Q(require('fs').createReadStream(__filename)).delay(1)
    }
    return deep(input)
      .then(function (result) {
        return expect(result.a.pipe).to.be.a('function')
      })
  })
})
