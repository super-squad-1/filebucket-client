'use strict'

// initView()
// initializes the view containers on index.html
// with specific handlebars templates and event handlers

const initView = () => {
  // render private view to navbar-div
  renderStatic('.navbar-div', './templates/nav-private.handlebars')
  // render file list view to content-div
  renderStatic('.content-div', './templates/file-list.handlebars')
  // append file table view to content-div
  appendStatic('.content-div', './templates/file-table.handlebars')
  // render sidebar view to sidebar-div
  renderStatic('.sidebar-div', './templates/sidebar.handlebars')
  // add event handlers for view contoller elements
  addHandlers()
  // render temporary forms for testing back-end integration
  initTempView()
}

// renderStatic(element, filepath)
// renders the template and replaces the element

const renderStatic = (element, filepath) => {
  const template = require(filepath)
  const content = template()
  $(element).html(content)
}

// appendStatic(element, filepath)
// renders the template and appends it to the element

const appendStatic = (element, filepath) => {
  const template = require(filepath)
  const content = template()
  $(element).append(content)
}

// initTempView()
// initializes temporary div view with test forms

const initTempView = () => {
  // user sign up / sign in forms
  renderStatic('.temp-div', './templates/form-auth.handlebars')
  // upload file form
  appendStatic('.temp-div', './templates/file-upload.handlebars')
  // update file form
  appendStatic('.temp-div', './templates/file-update.handlebars')
  // delete file form
  appendStatic('.temp-div', './templates/file-delete.handlebars')
}

const addHandlers = () => {
  // event handler for list group items
  $('.content-div').on('click', '.list-group-item', () => {
    alert(`list-group-item clicked`)
  })

  // event handler for file name link
  $('.content-div').on('click', '.file-name button', (event) => {
    event.stopPropagation()
    alert(`file-name clicked`)
  })

  // event handler for table body row
  $('.content-div').on('click', 'tbody tr', () => {
    alert(`table-row clicked`)
  })
}

module.exports = {
  initView
}
