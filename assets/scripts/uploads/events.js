'use strict'

const getFormFields = require('../../../lib/get-form-fields')

const uploadApi = require('./api')
const uploadUi = require('./ui')

const createUploadMultiPart = function (event) {
  event.preventDefault()
  console.log(`createUploadMultiPart Event: ${event.target}`)

  const myForm = event.target
  const data = new FormData(myForm)

  // const title = $('#file-upload-title').val()
  // const file = $('#file-upload-file').val()

  // const data = new FormData()
  // data.append('title', title)
  // data.append('file', file)

  // const data = {
  //   title: title,
  //   file: file
  // }

  // debugger

  console.log(`createUploadMultiPart data: ${data}`)

  uploadApi.createMulti(data)
    .then(uploadUi.success)
    .catch(uploadUi.error)
}

const addHandlers = function () {
  $('body').on('submit', '#multipart-form-data', createUploadMultiPart)
  $('body').on('submit', '#file-delete', onDelete)
  $('body').on('submit', '#file-update', onUpdate)
  $('body').on('change', '#file-selector', () => {
    const filename = $(event.target).val().replace(/.*[\/\\]/, '')
    // file-upload-title
    $('#file-upload-title').val(filename)
  })
}

const onDelete = function (event) {
  event.preventDefault()
  const file = getFormFields(event.target).file
  console.log('in delete: ', event)
  if (file.id.length !== 0) {
    uploadApi.deleteFile(file)
    .then(uploadUi.deleteFileSuccess)
    .catch(uploadUi.deleteFileFailure)
  }
}

const onUpdate = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  uploadApi.updateFile(data)
  .then(uploadUi.updateFileSuccess)
  .catch(uploadUi.updateFileFailure)
}

module.exports = {
  createUploadMultiPart,
  addHandlers
}
