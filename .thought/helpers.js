var path = require('path')
var Q = require('q');

module.exports = {
  /**
   * Merges the example output into the source code.
   * In the example, `console.log` must be wrapped so that `\u0001` is
   * inserted before each output.
   * `console.log` may not be called in loops.
   */
  mergeExample: function (cwd, filename, options, customizeEngine) {
    var helpers = customizeEngine.engine.helpers

    var code = helpers.example(path.join(cwd, filename), {
      hash: {
        snippet: true
      }
    })
    var result = helpers.exec(`node ${filename}`, {
      hash: {
        cwd: cwd,
        lang: 'raw'
      }
    })

    return Q.all([code,result]).spread(function(code, result) {
      var output = result.split('\u0001')
      return code.replace(/console\.log\-output/g, function() {
        return output.shift().trim();
      })
    })

  }
}
