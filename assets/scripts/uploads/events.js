'use strict'

// const getFormFields = require('../../../lib/get-form-fields')

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

  $('body').on('change', '#file-selector', () => {
    const filename = $(event.target).val().replace(/.*[\/\\]/, '')
    // file-upload-title
    $('#file-upload-title').val(filename)
    $(event.target).closest('.form-group').find('.help-block').show()
  })
}

module.exports = {
  createUploadMultiPart,
  addHandlers
}
