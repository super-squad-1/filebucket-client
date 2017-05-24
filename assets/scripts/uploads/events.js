'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const view = require('../view')

const uploadApi = require('./api')
const uploadUi = require('./ui')

const createUploadMultiPart = function (event) {
  event.preventDefault()
  const myForm = event.target
  const data = new FormData(myForm)

  uploadApi.createMulti(data)
    .then(uploadUi.uploadFileSuccess)
    .then(() => {
      uploadApi.getFiles()
          .then(uploadUi.getFilesSuccess)
          .catch(uploadUi.getFilesFailure)
    })
    .catch(uploadUi.uploadFileFailure)
}

const onDelete = function (event) {
  event.preventDefault()
  const dataId = $(this).closest('tr').data('id')
  // getFormFields(event.target).file
  console.log('in delete: ', dataId)
  if (dataId.length !== 0) {
    uploadApi.deleteFile(dataId)
      .then(uploadUi.deleteFileSuccess)
      .then(() => {
        uploadApi.getFiles()
          .then(uploadUi.getFilesSuccess)
          .catch(uploadUi.getFilesFailure)
      })
      .catch(uploadUi.deleteFileFailure)
  }
}

// const onDownload = function (event) {
//   event.preventDefault()
//   const dataId = $(this).closest('tr')
//   if (dataId.length !== 0) {
//   // getFormFields(event.target)
//     uploadApi.downloadFile(dataId)
//   .then(uploadUi.downloadFileSuccess)
//   .catch(uploadUi.downloadFileFailure)
//   }
// }

// NOTE: this function needs to be passed more than just the id.
// It also needs the title as part of a data object with the id

const onUpdate = function (event) {
  event.preventDefault()

  const data = getFormFields(event.target)
  data.upload.id = $(event.target).data('id')
  console.log(data.upload.id)

  if (!data.upload.name) {
    view.formAlert('#update-file', '#file-update-title')
  } else {
    uploadApi.updateFile(data)
      .then(uploadUi.updateFileSuccess)
      .then(() => {
        uploadApi.getFiles()
            .then(uploadUi.getFilesSuccess)
            .catch(uploadUi.getFilesFailure)
      })
      .catch(uploadUi.updateFileFailure)
  }
}

const onGetFiles = function () {
  console.log('uploads.events.onGetFiles')
  uploadApi.getAllFiles()
    .then(uploadUi.getFilesSuccess)
    .catch(uploadUi.getFilesFailure)
}

const addHandlers = function () {
  $('body').on('submit', '#multipart-form-data', createUploadMultiPart)

  // $('body').on('submit', '#file-delete', onDelete)
  $('body').on('click', '#each-file-delete', onDelete)
  // $('body').on('submit', '#file-update', onUpdate)
  $('body').on('submit', '#update-file', onUpdate)

  // $('body').on('click', '#each-file-download', onDownload)
  $('body').on('click', '#get-files', onGetFiles)

  $('body').on('change', '#file-selector', () => {
    // get the filename from the file selector input
    const filename = $(event.target).val().replace(/.*[\/\\]/, '')
    // get the title to the upload
    $('#file-upload-title').val(filename)
    // show help text on the file upload modal
    $(event.target).closest('.form-group').find('.help-block').show()
  })
}

module.exports = {
  createUploadMultiPart,
  addHandlers,
  onUpdate,
  onDelete,
  onGetFiles
}
