// Show an object on the screen.
function showObject(obj) {
  const pre = document.getElementById('response');
  const preParent = pre.parentElement;
  pre.innerText = JSON.stringify(obj, null, 4);
  preParent.classList.add('flashing');
  setTimeout(() => {
    preParent.classList.remove('flashing');
  }, 300);
}

function showResponse(response) {
  response.json().then(data => {
    showObject({
      data,
      status: response.status,
      statusText: response.statusText
    });
  });
}

/**
 * IT IS UNLIKELY THAT YOU WILL WANT TO EDIT THE CODE ABOVE.
 * EDIT THE CODE BELOW TO SEND REQUESTS TO YOUR API.
 *
 * Native browser Fetch API documentation to fetch resources: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
 */

// Map form (by id) to the function that should be called on submit
const formsAndHandlers = {
  'create-user': createUser,
  'delete-user': deleteUser,
  'change-username': changeUsername,
  'change-password': changePassword,
  'sign-in': signIn,
  'sign-out': signOut,
  'view-all-freets': viewAllFreets,
  'view-freets-by-author': viewFreetsByAuthor,
  'create-freet': createFreet,
  'edit-freet': editFreet,
  'delete-freet': deleteFreet,
  'report-freet': createReport,
  'view-all-itemsForSale': viewAllitemsForSale,
  'view-itemsForSale-by-seller': viewItemsForSaleBySeller,
  'create-itemForSale': createItemForSale,
  'edit-description': editDescription,
  'edit-price': editPrice,
  'edit-link': editLink,
  'delete-itemForSale': deleteItemForSale,
  'create-viewOnlyMode': createViewOnlyRelationship,
  'update-viewOnlyMode': updateViewOnlyMode,
  'create-react': createReact,
  'delete-React': deleteReact,
  'edit-React': editReact,
  //'view-all-comments': viewAllComments,
  //'view-comments-by-commentor': viewCommentsByCommentor,
  'create-comment': createComment,
  'edit-comment': editComment,
  'delete-comment': deleteComment,
  'create-shoppingCart': createShoppingCart,
  'view-all-shoppingCarts': viewAllCarts,
  'add-to-cart': addToCart,
  'delete-shoppingCart': deleteCart,
  'delete-from-cart': deleteFromCart

};

// Attach handlers to forms
function init() {
  Object.entries(formsAndHandlers).forEach(([formID, handler]) => {
    const form = document.getElementById(formID);
    form.onsubmit = e => {
      e.preventDefault();
      const formData = new FormData(form);
      handler(Object.fromEntries(formData.entries()));
      return false; // Don't reload page
    };
  });
}

// Attach handlers once DOM is ready
window.onload = init;
