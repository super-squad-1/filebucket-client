'use strict'

//
//  PUBLIC AND PRIVATE MODES
//

//  setPublicMode()
//    set public mode for navbar and content area

const setPublicMode = () => {
  // closeAlert()

  // render handlebars template for public nav
  // const navTemplate = require('./templates/nav-public.handlebars')
  renderView('.navbar-div', 'nav-public')
  // render handlebars template for sign-in/sign-up forms
  // const contentTemplate = require('./templates/form-auth.handlebars')
  renderView('.content-div', 'form-auth')
  clearView('.temp-div')
}

const setPrivateMode = () => {
  // closeAlert()
  // render handlebars template for private nav
  // const navTemplate = require('./templates/nav-private.handlebars')
  renderView('.navbar-div', 'nav-private')

  initTempView()
}

//
// VALIDATION & ALERT METHODS
//

// formAlert(form, field)
//    triggers form input validation alert

const formAlert = (form, field) => {
  clearFormAlerts(form)
  // apply alert classes to specfic input
  $(field).closest('.form-group').addClass('has-warning has-feedback')
  // add alert icon to specific input
  $(field).closest('.input-group').append(`<span class="glyphicon glyphicon-warning-sign form-control-feedback"></span>`)
  // show help text for specific input
  $(field).closest('.form-group').find('.help-block').show()
}

// clearFormFields(form)
//    clear all values from form fields

const clearForm = (form) => {
  // clear form field alerts
  clearFormAlerts(form)
  // clear field values
  $(form).find('.form-control').val('')
}

// clearFormAlerts(form)
//    clear all feedback classes and icons from form fields

const clearFormAlerts = (form) => {
  // clear all alert classes from inputs
  $(form).find('.form-group').removeClass('has-warning has-feedback')
  // remove all alert class icons from inputs
  $(form).find('.form-group .form-control-feedback').remove()
  // hide any visible help text
  $(form).find('.help-block').hide()
}

// showAlert(mode, message)
//    displays global alert box for info or warning

const showAlert = (mode, message) => {
  // convert mode label to bootstrap class
  mode = (mode === 'error') ? 'danger' : 'info'
  // render handlebars template for alert
  // const alertTemplate = require('./templates/alert.handlebars')
  // const content = alertTemplate({ mode: mode, message: message })

  // if there's already an alert
  if ($('.alert').length) {
    // replace the existing alert
    renderView('.alert', 'alert', { mode: mode, message: message })
  } else {
    // insert a new alert
    prependView('.content-div', 'alert', { mode: mode, message: message })
  }
}

// closeError()
//  close global error box but not info alerts

const closeError = () => {
  $('.alert-danger').alert('close')
}

// closeAlert()
//   close all global alert boxes

const closeAlert = () => {
  $('.alert').alert('close')
}

// initView()
// initializes view containers and event handlers

const initView = () => {
  // render private view to navbar-div
  renderView('.navbar-div', 'nav-public')
  // user sign up / sign in forms
  renderView('.content-div', 'form-auth')
  // renderView('.content-div', 'form-auth')
  // add event handlers for view contoller elements
  addHandlers()
}

// renderView(element, hbsFile)
// renders the template and replaces the element

const renderView = (element, hbsFile, params) => {
  const template = require(`./templates/${hbsFile}.handlebars`)
  const content = template(params)
  $(element).html(content)
}

// appendView(element, filepath)
// renders the template and appends it to the element

const appendView = (element, hbsFile, params) => {
  const template = require(`./templates/${hbsFile}.handlebars`)
  const content = template(params)
  $(element).append(content)
}

// prependView(element, filepath)
// renders the template and appends it to the element

const prependView = (element, hbsFile, params) => {
  const template = require(`./templates/${hbsFile}.handlebars`)


  const content = template(params)
  $(element).prepend(content)
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
  renderView('.navbar-div', 'nav-private')
  // render file list view to content-div
  renderView('.content-div', 'file-list')
  // append file table view to content-div
  appendView('.content-div', 'file-table')
  // render sidebar view to sidebar-div
  // renderView('.sidebar-div', './templates/sidebar')

  // upload file form
  renderView('.temp-div', 'file-upload')
  // update file form
  appendView('.temp-div', 'file-update')
  // delete file form
  appendView('.temp-div', 'file-delete')
}

//  showChangePasswordSuccess()
//    password changed successfully

const showChangePasswordSuccess = () => {
  // collapse change password dropdown
  $('#change-password-nav').dropdown('toggle')
  $('.navbar-collapse').collapse('hide')
  // clear change password form fields
  $('#change-password input').val('')
  // display successful alert message
  // showAlert('info', 'Your password is changed. Hope you remember it.')
}

//  showChangePasswordFailure()
//    password change failed

const showChangePasswordFailure = () => {
  // collapse change password dropdown
  $('#change-password-nav').dropdown('toggle')
  $('.navbar-collapse').collapse('hide')
  // clear change password form fields
  $('#change-password input').val('')
  // display successful alert message
  // showAlert(`error`, `For highly complex reasons, your password couldn't be changed.`)
}

const showUpload = (id) => {
  // render handlebars template with data-id for item
  // const contentTemplate = require('./templates/modal-confirm-delete.handlebars')
  // const content = contentTemplate({id: id})

  // if there's already a modal
  if ($('#upload-modal').length) {
    // replace the existing modal
    renderView('#upload-modal', 'modal-upload')
  } else {
    // insert a new alert
    appendView('body', 'modal-upload')
  }

  // show the hidden modal
  $('#upload-modal').modal('show')
}

const addHandlers = () => {
  // event handler for sign in form
  // $('.content-div').on('submit', '#sign-in', () => {
  //   // TEMPORARY
  //   initTempView()
  // })

  // event handler for sign in form
  // $('.navbar-div').on('click', '#sign-out-btn', () => {
  //   // TEMPORARY
  //   clearView('.temp-div')
  //   initView()
  // })

  // event handler for list group items
  $('.content-div').on('click', '.list-group-item', () => {
    // TEMPORARY
    console.log(`list-group-item clicked`)
  })

  // event handler for table body row
  $('.content-div').on('click', 'tbody tr', () => {
    // TEMPORARY
    console.log(`table-row clicked`)
  })

  // event handler for file name link
  $('.content-div').on('click', '.file-name button', (event) => {
    // keeps table row from registering click event, too
    event.stopPropagation()
    // TEMPORARY
    console.log(`file-name clicked`)
  })

  $('.navbar-div').on('click', '#show-upload-button', () => {
    // TEMPORARY
    showUpload()
    // console.log(`list-group-item clicked`)
  })
}

module.exports = {
  initView,
  setPublicMode,
  setPrivateMode,
  showAlert,
  formAlert,
  clearForm,
  clearFormAlerts,
  closeError,
  closeAlert,
  showChangePasswordSuccess,
  showChangePasswordFailure,
  showUpload
}
