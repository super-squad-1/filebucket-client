'use strict'

const getFormFields = require('../../../lib/get-form-fields')
// view controller functions
const view = require('../view')
// upload API and ui functions
const uploadApi = require('./api')
const uploadUi = require('./ui')

// createUploadMultiPart(event)
// upload a multi-part form (with file)

const createUploadMultiPart = function (event) {
  event.preventDefault()
  const myForm = event.target
  const data = new FormData(myForm)

  if (!data.get('file[name]')) {
    view.formAlert('#multipart-form-data', '#file-upload-title')
  } else {
    uploadApi.createMulti(data)
      .then(uploadUi.uploadFileSuccess)
      .then(() => {
        uploadApi.getFiles()
            .then(uploadUi.getFilesSuccess)
            .then(() => { view.showAlert(`message`, `Your file has been uploaded`) })
            .catch(uploadUi.getFilesFailure)
      })
      .catch(uploadUi.uploadFileFailure)
  }
}

const onDelete = function (id) {
  // event.preventDefault()
  // const dataId = $(this).closest('tr').data('id')

  if (id.length !== 0) {
    uploadApi.deleteFile(id)
      .then(uploadUi.deleteFileSuccess)
      .then(() => {
        uploadApi.getFiles()
          .then(uploadUi.getFilesSuccess)
          .then(() => { view.showAlert(`message`, `Your file has been deleted`) })
          .catch(uploadUi.getFilesFailure)
      })
      .catch(uploadUi.deleteFileFailure)
  }
}

// NOTE: this function needs to be passed more than just the id.
// It also needs the title as part of a data object with the id

const onUpdate = function (event) {
  event.preventDefault()

  const data = getFormFields(event.target)
  data.upload.id = $(event.target).data('id')

  if (!data.upload.name) {
    view.formAlert('#update-file', '#file-update-title')
  } else {
    uploadApi.updateFile(data)
      .then(uploadUi.updateFileSuccess)
      .then(() => {
        uploadApi.getFiles()
            .then(uploadUi.getFilesSuccess)
            .then(() => { view.showAlert(`message`, `Your file has been updated.`) })
            .catch(uploadUi.getFilesFailure)
      })
      .catch(uploadUi.updateFileFailure)
  }
}

const onGetFiles = function () {
  uploadApi.getAllFiles()
    .then(uploadUi.getFilesSuccess)
    .catch(uploadUi.getFilesFailure)
}

// onConfirmDeleteItem
//    confirm user's intent to delete before calling API

const onConfirmDeleteItem = function (event) {
  // get the item id
  const id = $(this).closest('tr').data('id')
  // manage the confirm delete modal
  view.showConfirmDelete(id)

  // if modal confirms delete item
  $('#delete-modal-confirm').on('click', () => {
    // hide modal
    $('#delete-modal').modal('hide')
    // make delete item api call
    onDelete(id)
  })
}

const addHandlers = function () {
  // handler for submitting multi part upload form
  $('body').on('submit', '#multipart-form-data', createUploadMultiPart)
  // handler for clicking a file delete button
  // $('body').on('click', '#each-file-delete', onDelete)
  // delete item link clicked
  $('.content-div').on('click', '#each-file-delete', onConfirmDeleteItem)
  // handler for submitting the file uopdate form
  $('body').on('submit', '#update-file', onUpdate)

  // handler for changing the file selector
  // and setting the filename in the dialog box
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
