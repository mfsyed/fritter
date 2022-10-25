/* eslint-disable @typescript-eslint/restrict-template-expressions */

/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properites 'username' and 'password'
 */

//  function viewAllComments(fields) {
//     fetch('/api/freets')
//       .then(showResponse)
//       .catch(showResponse);
//   }
  
//   function viewCommentsByCommentor(fields) {
//     fetch(`/api/freets?commentor=${fields.commentor}`)
//       .then(showResponse)
//       .catch(showResponse);
//   }
  
  function createComment(fields) {
    fetch('/api/freets', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
  }
  
  function editComment(fields) {
    fetch(`/api/freets/${fields.id}`, {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
  }
  
  function deleteComment(fields) {
    fetch(`/api/freets/${fields.id}`, {method: 'DELETE'})
      .then(showResponse)
      .catch(showResponse);
  }
  