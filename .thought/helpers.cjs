/* eslint-disable no-console */
const path = require("path");

module.exports = {
  /**
   * Merges the example output into the source code.
   * In the example, `console.log` must be wrapped so that `\u0001` is
   * inserted before each output.
   * `console.log` may not be called in loops.
   */
  mergeExample: function (cwd, filename, options) {
    const helpers = options.customize.engine.helpers;

    var code = helpers.example(path.join(cwd, filename), {
      ...options,
      hash: {
        snippet: true,
      },
    });
    var result = helpers.exec(`node ${filename}`, {
      ...options,
      hash: {
        cwd: cwd,
        lang: "raw",
      },
    });

    return Promise.all([code, result]).then(function ([code, result]) {
      console.log(result);
      const output = result.split("\u0001");
      return code.replace(/console\.log-output/g, function () {
        return output.shift().trim();
      });
    });
  },
};
