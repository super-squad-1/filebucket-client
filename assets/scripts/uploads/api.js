'use strict'

const config = require('../config')
const store = require('../store.js')

const createMulti = function (data) {
  return $.ajax({
    // ajax options go here
    method: 'POST',
    url: config.apiOrigin + '/uploads',
    data,
    contentType: false,
    processData: false
  })
}

// const updateFile = (data) => {
//   return $.ajax({
//     url: config.apiOrigin + '/update/' + data.id,
//     method: 'PATCH',
//     headers: {
//       Authorization: 'Token token=' + store.user.token
//     },
//     data: data
//   })
// }

const deleteFile = (data) => {
  console.log('data', data)
  return $.ajax({
    url: config.apiOrigin + '/uploads/' + data.id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: data
  })
}

module.exports = {
  createMulti,
  // updateFile,
  deleteFile
}
