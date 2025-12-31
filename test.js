function loadDoc1() {
  var xhttp = new XMLHttpRequest();

  xhttp.open(
    "POST",
    "https://anshall.atlassian.net/cgraphql?q=ConfigurationFormConfigurationPageUpdateMutation",
    true
  );

  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.withCredentials = true;

  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      console.log("Status:", this.status);
      console.log("Response:", this.responseText);
    }
  };

  var data = JSON.stringify([
    {
      operationName: "ConfigurationFormConfigurationPageUpdateMutation",
      variables: {
        siteConfigInput: {
          siteTitle: "Confluencexxalap",               
          customContactMessage: "xxxxlap",             
          isContactAdministratorsFormEnabled: true,
          siteHomePage: "Confluence Home",
          isEditorConversionForSiteEnabled: true,
          isEditorFullWidthEnabled: false,
          isEmailNotificationEnabled: true,
          isPushNotificationEnabled: true,
          isLikesEnabled: true,
          timeFormat: "h:mm a",
          dateTimeFormat: "MMM dd, yyyy HH:mm",
          dateFormat: "MMM dd, yyyy",
          longNumberFormat: "###############",
          decimalNumberFormat: "###############.##########",
          maxAttachmentSize: 104857600,
          maxNumberOfAttachmentsPerUpload: 6,
          isExternalConnectionsEnabled: true,
          connectionTimeout: 10000,
          socketTimeout: 10000,
          globalDefaultLocale: "en_US",
          indexingLanguage: "english"
        }
      },
      query: `
        mutation ConfigurationFormConfigurationPageUpdateMutation(
          $siteConfigInput: ConfluenceUpdateSiteConfigurationInput!
        ) {
          confluence {
            updateSiteConfiguration(input: $siteConfigInput) {
              success
              errors {
                message
                extensions {
                  errorType
                  statusCode
                }
              }
            }
          }
        }
      `
    }
  ]);

  xhttp.send(data);
}

window.onload = loadDoc1;
