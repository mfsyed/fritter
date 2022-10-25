/* eslint-disable @typescript-eslint/restrict-template-expressions */

function createViewOnlyRelationship(fields) {
    fetch(`/api/viewOnlyMode/${fields.id}`, {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
        .then(showResponse)
        .catch(showResponse);
}


function updateViewOnlyMode(fields){
    fetch(`/api/viewOnlyMode/${fields.id}`, {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
}