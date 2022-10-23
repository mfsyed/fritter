/* eslint-disable @typescript-eslint/restrict-template-expressions */

/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properites 'username' and 'password'
 */

 function viewAllitemsForSale(fields) {
    fetch('/api/itemsForSale')
      .then(showResponse)
      .catch(showResponse);
  }
  
  function viewItemsForSaleBySeller(fields) {
    fetch(`/api/itemsForSale?seller=${fields.seller}`)
      .then(showResponse)
      .catch(showResponse);
  }
  
  function createItemForSale(fields) {
    fetch('/api/itemsForSale', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
  }
  
  function editDescription(fields) {
    fetch(`/api/itemsForSale/${fields.id}`, {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
  }
  
  function editPrice(fields) {
    fetch(`/api/itemsForSale/${fields.id}`, {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
  }

  function editLink(fields) {
    fetch(`/api/itemsForSale/${fields.id}`, {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
  }

  function deleteItemForSale(fields) {
    fetch(`/api/itemsForSale/${fields.id}`, {method: 'DELETE'})
      .then(showResponse)
      .catch(showResponse);
  }
  