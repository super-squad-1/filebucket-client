'use strict'

const view = require('../view.js')

const success = function (data) {
  console.log('success data is:', data)
}

const error = function (error) {
  console.log('error is:', error)
}

const updateFileSuccess = (data) => {
  console.log(data)
}

const updateFileFailure = (error) => {
  console.log('error on update file in ', error)
}

const deleteFileSuccess = (data) => {
  console.log('success delete file')
}

const deleteFileFailure = (error) => {
  console.log('error on delete file in ', error)
}

const downloadFileSuccess = (data) => {
  console.log('success download file')
}

const downloadFileFailure = (error) => {
  console.log('error on download file in ', error)
}

const getFilesSuccess = (response) => {
  console.log('uploads.events.getFilesSuccess: response')
  console.log(`${response}`)

  view.showFiles(response.uploads)
}

const getFilesFailure = () => {
  view.showAlert(`error`, `Hmmm. Couldn't get your list of files...`)
}

module.exports = {
  success,
  error,
  updateFileSuccess,
  updateFileFailure,
  deleteFileSuccess,
  deleteFileFailure,
  downloadFileSuccess,
  downloadFileFailure,
  getFilesSuccess,
  getFilesFailure
}
