/* eslint-disable @typescript-eslint/restrict-template-expressions */

function createReport(fields) {
  console.log(body)
    fetch(`/api/reports/${fields.id}`, {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
  }