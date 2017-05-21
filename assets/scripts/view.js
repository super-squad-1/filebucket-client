'use strict'

// renderView(element, content)
// replaces element's html with content

const renderView = (element, content) => {
  $(element).html(content).slideDown(250)
}

// appendView(element, content)
// appends content to the end of element's html

const appendView = (element, content) => {
  $(element).append(content).slideDown(250)
}

// initView()
// initializes application views

const initView = () => {
  initNavView()
  initListView()
  initSidebarView()

  addHandlers()
  // temporary forms for testing
  initTempView()
}

// initNavView()
// initializes navbar view

const initNavView = () => {
  const template = require('./templates/nav-private.handlebars')
  const content = template()
  $('.navbar-div').html(content)
}

// initListView()
// initializes file list view

const initListView = () => {
  const template = require('./templates/file-list.handlebars')
  const content = template()
  $('.content-div').html(content)
}

// initSidebarView()
// initializes sidebar panel view

const initSidebarView = () => {
  const template = require('./templates/sidebar.handlebars')
  const content = template()
  $('.sidebar-div').html(content)

}

// initTempView()
// initializes temporary div view with test forms

const initTempView = () => {
  // user sign up / sign in forms
  let template = require('./templates/form-auth.handlebars')
  let content = template()
  $('.temp-div').html(content)

  // upload file form
  template = require('./templates/file-upload.handlebars')
  content = template()
  $('.temp-div').append(content)

  // update file form
  template = require('./templates/file-update.handlebars')
  content = template()
  $('.temp-div').append(content)

  // delete file form
  template = require('./templates/file-delete.handlebars')
  content = template()
  $('.temp-div').append(content)
}

const addHandlers = () => {
  $('.content-div').on('click', '.list-group-item', () => {
    alert(`list-group-item`)
  })
  $('.content-div').on('click', '.file-name button', (event) => {
    event.stopPropagation()
    alert(`file-name`)
  })
}

module.exports = {
  initView
}
