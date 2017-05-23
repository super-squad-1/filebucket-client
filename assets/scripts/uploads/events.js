'use strict'

const getFormFields = require('../../../lib/get-form-fields')

const uploadApi = require('./api')
const uploadUi = require('./ui')

const createUploadMultiPart = function (event) {
  event.preventDefault()
  const myForm = event.target
  const data = new FormData(myForm)

  uploadApi.createMulti(data)
    .then(uploadUi.success)
    .catch(uploadUi.error)
}

const addHandlers = function () {
  $('body').on('submit', '#multipart-form-data', createUploadMultiPart)

  // $('body').on('submit', '#file-delete', onDelete)
  $('body').on('click', '#each-file-delete', onDelete)
  // $('body').on('submit', '#file-update', onUpdate)
  $('body').on('click', '#each-file-update', onUpdate)

  $('body').on('change', '#file-selector', () => {
    const filename = $(event.target).val().replace(/.*[\/\\]/, '')
    // file-upload-title
    $('#file-upload-title').val(filename)

    $(event.target).closest('.form-group').find('.help-block').show()
  })
}

// const onDelete = function (event) {
//   event.preventDefault()
//   const data = getFormFields(event.target).file
//   console.log('in delete: ', data.id)
//   if (data.id.length !== 0) {
//     uploadApi.deleteFile(data.id)
//     .then(uploadUi.deleteFileSuccess)
//     .catch(uploadUi.deleteFileFailure)
//   }
// }

const onDelete = function (event) {
  event.preventDefault()
  const dataId = $(this).closest('tr')
  // getFormFields(event.target).file
  console.log('in delete: ', dataId)
  if (dataId.length !== 0) {
    uploadApi.deleteFile(dataId)
    .then(uploadUi.deleteFileSuccess)
    .catch(uploadUi.deleteFileFailure)
  }
}

// const onUpdate = function (event) {
//   event.preventDefault()
//   const dataId = getFormFields(event.target)
//   uploadApi.updateFile(dataId)
//   .then(uploadUi.updateFileSuccess)
//   .catch(uploadUi.updateFileFailure)
// }

const onUpdate = function (event) {
  event.preventDefault()
  const dataId = $(this).closest('tr')
  if (dataId.length !== 0) {
  // getFormFields(event.target)
    uploadApi.updateFile(dataId)
  .then(uploadUi.updateFileSuccess)
  .catch(uploadUi.updateFileFailure)
  }
}

module.exports = {
  createUploadMultiPart,
  addHandlers,
  onUpdate,
  onDelete
}
