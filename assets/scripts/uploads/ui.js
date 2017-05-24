'use strict'

const view = require('../view.js')

const deleteFileSuccess = () => {

}

const deleteFileFailure = () => {
  view.showAlert(`error`, `Your file could not be deleted`)
}

const getFilesSuccess = (response) => {
  view.showFiles(response.uploads)
}

const getFilesFailure = () => {
  view.showAlert(`error`, `Hmmm. Couldn't get your list of files...`)
}

const uploadFileSuccess = (data) => {
  $('#upload-modal').modal('hide')
}

const uploadFileFailure = () => {
  view.showAlert(`error`, `Your file could not be uploaded.`)
}

const updateFileSuccess = () => {
  $('#update-modal').modal('hide')
}

const updateFileFailure = () => {
  view.showAlert(`error`, `Your file title could not be updated.`)
}

module.exports = {
  updateFileSuccess,
  updateFileFailure,
  deleteFileSuccess,
  deleteFileFailure,
  getFilesSuccess,
  getFilesFailure,
  uploadFileSuccess,
  uploadFileFailure
}
