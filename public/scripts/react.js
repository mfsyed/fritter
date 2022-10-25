/* eslint-disable @typescript-eslint/restrict-template-expressions */


function createReact(fields) {
    fetch(`/api/react/${fields.id}`, {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
}



function deleteReact(fields) {
  fetch(`/api/react/${fields.id}`, {method: 'DELETE'})
    .then(showResponse)
    .catch(showResponse);
}


function editReact(fields) {
  fetch(`/api/react/${fields.id}`, {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}