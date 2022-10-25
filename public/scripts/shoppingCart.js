/* eslint-disable @typescript-eslint/restrict-template-expressions */


function viewAllCarts(fields) {
  fetch('/api/shoppingCarts')
    .then(showResponse)
    .catch(showResponse);
}

function createShoppingCart(fields) {
    fetch('/api/shoppingCarts', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
  }
  
  function addToCart(fields) {
    fetch(`/api/shoppingCarts/${fields.itemForSaleId}`, {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
  }

  function deleteFromCart(fields) {
    fetch('/api/shoppingCarts/', {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
  }
  

  function deleteCart(fields) {
    fetch(`/api/shoppingCarts/${fields.id}`, {method: 'DELETE'})
      .then(showResponse)
      .catch(showResponse);
  }