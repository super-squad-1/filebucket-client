'use strict'

const view = require('./view')
const api = require('./uploads/api')
const ui = require('./uploads/ui')

// delete item link clicked
$('.content-div').on('click', '.delete-item-link', onConfirmDeleteItem)

// onConfirmDeleteItem
//    confirm user's intent to delete before calling API

const onConfirmDeleteItem = function (event) {
  // get the item id
  const id = $(event.target).closest('.panel').data('id')
  // manage the confirm delete modal
  view.confirmDelete(id)

  // if modal confirms delete item
  $('#delete-modal-confirm').on('click', () => {
    // hide modal
    $('#delete-modal').modal('hide')
    // make delete item api call
    onDeleteItem(id)
  })
}

const onDeleteItem = function (itemId) {
  // create data object from clicked item
  const data = {
    item: {
      id: itemId
    }
  }

  // prevent default form post
  event.preventDefault()

  // make API calls and set up handlers for callbacks
  api.deleteItem(data)
    .then(() => {
      api.getItems()
        .then(ui.getItemsSuccess)
        .catch(ui.getItemsFailure)
    })
    .catch(ui.deleteItemFailure)
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

//  deleteItemFailure()
//    error from delete item

const deleteItemFailure = () => {
  // set alert error
  view.showAlert(`error`, `There is a problem deleting your snippet.`)
}
