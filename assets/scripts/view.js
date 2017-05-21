'use strict'

// initView()
// initializes the view containers on index.html
// with specific handlebars templates and event handlers

const initView = () => {
  // render private view to navbar-div
  renderView('.navbar-div', require('./templates/nav-public.handlebars'))
  // user sign up / sign in forms
  renderView('.content-div', require('./templates/form-auth.handlebars'))
  // add event handlers for view contoller elements
  addHandlers()
}

// renderView(element, filepath)
// renders the template and replaces the element

const renderView = (element, template) => {
  // const template = require(filepath)
  const content = template()
  $(element).html(content)
}

// appendView(element, filepath)
// renders the template and appends it to the element

const appendView = (element, template) => {
  // const template = require(filepath)
  const content = template()
  $(element).append(content)
}

// clearView(element)
// clears the html from the specified element

const clearView = (element) => {
  $(element).html('')
}

// initTempView()
// initializes temporary private view with sample grids and test forms

const initTempView = () => {
  // render private view to navbar-div
  renderView('.navbar-div', require('./templates/nav-private.handlebars'))
  // render file list view to content-div
  renderView('.content-div', require('./templates/file-list.handlebars'))
  // append file table view to content-div
  appendView('.content-div', require('./templates/file-table.handlebars'))
  // render sidebar view to sidebar-div
  // renderView('.sidebar-div', './templates/sidebar.handlebars')

  // upload file form
  renderView('.temp-div', require('./templates/file-upload.handlebars'))
  // update file form
  appendView('.temp-div', require('./templates/file-update.handlebars'))
  // delete file form
  appendView('.temp-div', require('./templates/file-delete.handlebars'))
}

const addHandlers = () => {
  // event handler for sign in form
  $('.content-div').on('submit', '#sign-in', () => {
    initTempView()
  })

  // event handler for sign in form
  $('.navbar-div').on('click', '#sign-out-btn', () => {
    clearView('.temp-div')
    initView()
  })

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
