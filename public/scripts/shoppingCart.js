/* eslint-disable @typescript-eslint/restrict-template-expressions */


function createShoppingCart(fields) {
    fetch('/api/shoppingCarts', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
  }
  
  function addToCart(fields) {
    fetch(`/api/shoppingCarts/${fields.id}`, {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
  }
  

  function deleteCart(fields) {
    fetch(`/api/shoppingCarts/${fields.id}`, {method: 'DELETE'})
      .then(showResponse)
      .catch(showResponse);
  }