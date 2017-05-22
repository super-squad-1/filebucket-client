'use strict'

const config = require('../config')

const createMulti = function (data) {
  console.log(`createMulti data: ${data}`)
  return $.ajax({
    // ajax options go here
    method: 'POST',
    url: config.apiOrigin + '/uploads',
    data,
    contentType: false,
    processData: false
  })
}

module.exports = {
  createMulti
}
