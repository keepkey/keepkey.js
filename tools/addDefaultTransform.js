'use strict'

module.exports = {
  /**
   * Add a "default" property to all JS imports to make them compatible with rollup
   *
   * Rollup commonjs plugin converts all modules to do default exports, but ts-jest doesn't
   * do that, so `import module from 'module'` fails because there is no ".default" property
   *
   * This just adds a "default" property to all imported JS files
   *
   * @param {string} src Source file provided by jest
   * @returns {string}
   */
  process(src) {
    return src + '\n\nmodule.exports.default = module.exports.default || module.exports;'
  }
}
