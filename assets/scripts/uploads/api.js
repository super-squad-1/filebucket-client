'use strict'

const store = require('../store')
const config = require('../config')

const createMulti = function (data) {
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

const updateFile = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/uploads/' + data.upload.id,
    // data holds both id and title so no need for id
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: data
  })
}

const deleteFile = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/uploads/' + data,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const downloadFile = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/uploads/' + data.id,
    method: 'GET',
    data: data
  })
}

const getFiles = () => {
  return $.ajax({
    url: config.apiOrigin + '/uploads',
    method: 'GET'
  })
}

module.exports = {
  createMulti,
  updateFile,
  deleteFile,
  downloadFile,
  getFiles
}
