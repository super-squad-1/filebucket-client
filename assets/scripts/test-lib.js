'use strict'

//
// VIEW RENDERING METHODS
//

// renderView(element, content)
//    replaces element's html with content

const renderView = (element, content) => {
  $(element).html(content).slideDown(250)
}

// appendView(element, content)
//    appends content to the end of element's html

const appendView = (element, content) => {
  $(element).append(content).slideDown(250)
}

// prependView(element, content)
//    prepends content in front of element inside a common parent

const prependView = (element, content) => {
  $(content).prependTo(element).slideDown(250)
}

// insertView(element, content)
//    inserts content before element's html

const insertView = (element, content) => {
  $(element).before(content).slideDown(250)
}

// replaceView(element, content)
//    replaces element with content

const replaceView = (element, content) => {
  $(element).replaceWith(content).slideDown(250)
}

// removeView(element, content)
//    replaces element with content

const removeView = (element) => {
  $(element).remove().slideUp(250)
}

// showAlert(mode, message)
//    displays global alert box for info or warning

const showAlert = (mode, message) => {
  // convert mode label to bootstrap class
  mode = (mode === 'error') ? 'danger' : 'info'
  // render handlebars template for alert
  const alertTemplate = require('./templates/alert.handlebars')
  const content = alertTemplate({ mode: mode, message: message })

  // if there's already an alert
  if ($('.alert').length) {
    // replace the existing alert
    replaceView('.alert', content)
  } else {
    // insert a new alert
    prependView('.content-div', content)
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

// collapseNavbar()
//    collapses navbar (for responsive selections)

const collapseNavbar = () => {
  $('.navbar-collapse').collapse('hide')
}

// confirmDelete(id)
//    presents a modal dialog to confirm user's action to delete an item

const confirmDelete = (id) => {
  // render handlebars template with data-id for item
  const contentTemplate = require('./templates/modal-confirm-delete.handlebars')
  const content = contentTemplate({id: id})

  // if there's already a modal
  if ($('#delete-modal').length) {
    // replace the existing modal
    replaceView('#delete-modal', content)
  } else {
    // insert a new alert
    appendView('body', content)
  }

  // show the hidden modal
  $('#delete-modal').modal('show')
}

//
//  PUBLIC AND PRIVATE MODES
//

//  setPublicMode()
//    set public mode for navbar and content area

const setPublicMode = () => {
  closeAlert()
  removeView('.edit-item')
  removeView('.add-item')

  // render handlebars template for public nav
  const navTemplate = require('./templates/nav-public.handlebars')
  renderView('.navbar-div', navTemplate())
  // render handlebars template for sign-in/sign-up forms
  const contentTemplate = require('./templates/form-auth.handlebars')
  renderView('.content-div', contentTemplate())
}

//  setPrivateMode()
//    set private mode for navbar and content area

const setPrivateMode = () => {
  closeAlert()
  // render handlebars template for private nav
  const navTemplate = require('./templates/nav-private.handlebars')
  renderView('.navbar-div', navTemplate())
}

//
//  ITEM METHODS
//

//  showItems(data)
//    show all items for current user

const showItems = (data) => {
  // render handlebars template for private nav

// set preventIndent = true???

  const contentTemplate = require('./templates/item-grid.handlebars')
  const content = contentTemplate({items: data})
  renderView('.content-div', content)
}

//  showNewItem()
//    show the new item form

const showNewItem = () => {
  // collapse responsive nav
  collapseNavbar()
  // disable new item button
  disableNewItem()
  // render handlebars template for new item form
  const contentTemplate = require('./templates/item-new.handlebars')
  prependView('.content-div', contentTemplate())
}

//  cancelNewItem()
//    cancel the new item form

const cancelNewItem = () => {
  // re-enable new item button
  enableNewItem()
  // clear new item form element from DOM
  $('.add-item').remove()
}

//  showUpdateItem(event)
//    show the update item form

const showUpdateItem = (event) => {
  // store values from current item (in case of cancel)
  const item = {
    id: $(event.target).closest('.panel').data('id'),
    title: $(event.target).closest('.panel').find('.item-title').text(),
    body: $(event.target).closest('.panel').find('.item-body').text()
  }

  // render handlebars template for edit item form
  const updateTemplate = require('./templates/item-update.handlebars')
  const itemDiv = $(event.target).closest('.show-item')
  removeView(itemDiv)
  prependView('.content-div', updateTemplate(item))

  // scroll to top to edit
  $('html, body').animate({ scrollTop: 0 }, 200)
}

//  saveUpdateItem(item)
//    change from edit to view mode

const saveUpdateItem = (item) => {
  // render handlebars template to show new item
  const viewTemplate = require('./templates/item-show.handlebars')
  const restoreContent = viewTemplate(item)
  $('.edit-item').remove()
  $(restoreContent).insertAfter($('.grid-sizer'))
}

// cancelUpdateItem(event)
//    cancel the update item form

const cancelUpdateItem = (event) => {
  // get original item data
  const item = {
    item: {
      id: $(event.target).closest('.panel').data('id'),
      title: $(event.target).closest('.panel')
        .find('#update-item-title').data('content'),
      body: $(event.target).closest('.panel')
        .find('#update-item-body').data('content')
    }
  }

  // remove edit item div
  $('.edit-item').remove()

  // render handlebars template for original data view
  const viewTemplate = require('./templates/item-show.handlebars')
  const restoreContent = viewTemplate(item)
  $(restoreContent).insertAfter($('.grid-sizer'))
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
  showAlert('info', 'Your password is changed. Hope you remember it.')
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
  showAlert(`error`, `For highly complex reasons, your password couldn't be changed.`)
}

// addHandlers()
//    assign event handlers to forms, buttons, and links in the UI

const addHandlers = () => {
  // add animation to dropdown expand
  $('.navbar-div').on('show.bs.dropdown', '.dropdown', (event) => {
    $(event.target).find('.dropdown-menu').first().stop(true, true).slideDown(250)
  })

  // add animation to dropdown collapse
  $('.navbar-div').on('hide.bs.dropdown', '.dropdown', (event) => {
    event.preventDefault()
    $(event.target).find('.dropdown-menu').first().stop(true, true).slideUp(
      250, () => {
        // close dropdown menu
        $('.dropdown').removeClass('open')
        $('.dropdown').find('.dropdown-toggle').attr('aria-expanded', 'false')
        // clear fields
        clearForm($(event.target).find('.form').val('id'))
      })
  })

  // hljs.initHighlightingOnLoad()
  // $('.content-div pre code').each(function (i, block) {
  //   hljs.highlightBlock(block)
  // })
}

module.exports = {
  renderView,
  appendView,
  prependView,
  insertView,
  removeView,
  collapseNavbar,
  formAlert,
  clearForm,
  clearFormAlerts,
  showAlert,
  closeAlert,
  closeError,
  confirmDelete,
  disableNewItem,
  enableNewItem,
  setPublicMode,
  setPrivateMode,
  showItems,
  showNewItem,
  cancelNewItem,
  showUpdateItem,
  saveUpdateItem,
  cancelUpdateItem,
  showChangePasswordSuccess,
  showChangePasswordFailure,
  addHandlers
}
