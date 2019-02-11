'use strict'

module.exports = {
  process(src) {
    return src + '\n\nmodule.exports.default = module.exports;'
  }
}
