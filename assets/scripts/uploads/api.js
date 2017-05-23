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

const updateFile = (data) => {
  // debugger
  // console.log('update', data)
  return $.ajax({
    url: config.apiOrigin + '/update/' + data,
    // data holds both id and title so no need for id
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: data
  })
}

const deleteFile = (data) => {
  // debugger
  // console.log('update', data)
  return $.ajax({
    url: config.apiOrigin + '/uploads/' + data.id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: data
  })
}

const downloadFile = (data) => {
  // debugger
  // console.log('api.data', data)
  // console.log('api.data.id', data.id)
  return $.ajax({
    url: config.apiOrigin + '/uploads/' + data.id,
    method: 'GET',
    data: data
  })
}

module.exports = {
  createMulti,
  updateFile,
  deleteFile,
  downloadFile
}
