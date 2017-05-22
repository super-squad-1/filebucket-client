'use strict'

const uploadApi = require('./api')
const uploadUi = require('./ui')

const createUploadMultiPart = function (event) {
  event.preventDefault()
  console.log('it did something in multipart')

  const data = new FormData(event.target)

  uploadApi.createMulti(data)
    .then(uploadUi.success)
    .catch(uploadUi.error)
}

const addHandlers = function () {
  $('body').on('change', '#file-selector', () => {
    const test = $(event.target).val()
    // debugger
    $('#file-upload-info').html(test)
      // .replace(/.*[\/\\]/, '')))
  })
}
// onchange="$('#upload-file-info')
//   .html($(this)
//   .val()
//   .replace(/.*[\/\\]/, ''));"

module.exports = {
  createUploadMultiPart,
  addHandlers
}
