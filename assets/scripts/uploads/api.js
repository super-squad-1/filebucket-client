'use strict'

const config = require('../config')
const store = require('../store')

const createMulti = function (data) {
  console.log(`createMulti data: ${data}`)
  return $.ajax({
    // ajax options go here
    method: 'POST',
    url: config.apiOrigin + '/uploads',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    },
    data,
    contentType: false,
    processData: false
  })
}

module.exports = {
  createMulti
}
