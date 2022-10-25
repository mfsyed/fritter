/* eslint-disable @typescript-eslint/restrict-template-expressions */


function createReact(fields) {
    fetch(`/api/react/${fields.id}`, {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
  }