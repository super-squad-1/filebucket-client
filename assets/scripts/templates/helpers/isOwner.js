'use strict'

const isOwner = (conditional, options) => {
  if (options.hash.user === options.hash.owner) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
}

module.exports = isOwner
