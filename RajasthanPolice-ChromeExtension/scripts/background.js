chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed");
});

function extractContacts(text) {
    const phoneRegex = /\b(?:\+?(\d{1,4}))?[-. ]?\(?(\d{3})\)?[-. ]?(\d{3})[-. ]?(\d{4})\b/g;
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;

    const phones = text.match(phoneRegex) || [];
    const emails = text.match(emailRegex) || [];
  
    return { phones, emails };
}

function saveDataToStorage(key, data) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.set({ [key]: data }, function () {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError));
        } else {
          console.log(`Data saved for key '${key}'.`);
          resolve();
        }
      });
    });
}

chrome.tabs.onActivated.addListener(async function (activeInfo) {

    chrome.tabs.get(activeInfo.tabId, function(tab) {
        activeTabUrl = tab.url;
        console.log("Active tab URL:", activeTabUrl);

        // Now you can use activeTabUrl as needed
    });
    chrome.runtime.onMessage.addListener(
        async function(request, sender, sendResponse) {
        console.log(sender.tab ?
                    "from a content script:" + sender.tab.url :
                    "from the extension");
    const urlValidationResponse = await fetch('http://localhost:8080/getUrlScore', {
        method: "POST", 
        mode: "cors", 
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",  
        referrerPolicy: "no-referrer", 
        body: JSON.stringify({"url" : sender.tab.url}),
    });

    const urlScore = await urlValidationResponse.json();
    console.log(urlScore)
    console.log((urlScore.url_score * 100).toFixed(1));
    saveDataToStorage("urlScore", (urlScore.url_score * 100).toFixed(1));

    if ( urlScore.url_score * 100 < 60) {
        
        chrome.declarativeNetRequest.updateDynamicRules({
            addRules: [{
              'id': 1001,
              'priority': 1,
              'action': {
                'type': 'block'
              },
              'condition': {
                'urlFilter': sender.tab.url,
                'resourceTypes': [
                  'csp_report', 'font', 'image', 'main_frame', 'media', 'object', 'other', 'ping', 'script',
                  'stylesheet', 'sub_frame', 'webbundle', 'websocket', 'webtransport', 'xmlhttprequest'
                ]
              }
            }],
           removeRuleIds: [1001]
          })
    }


        if (request.action === "htmlText")

            sendResponse("Got the Html text successfully!");
            let contactDetailsText = extractContacts(request.data)
            console.log(contactDetailsText.phones[0])
            
            if (!contactDetailsText.phones[0]) {
                console.log("hello");
                saveDataToStorage("phoneNumber","No Phone Numbers")
            }

            else{
                saveDataToStorage("phoneNumber",contactDetailsText.phones[0])
            }

            if (!contactDetailsText.emails[0]) {
                saveDataToStorage("emailId","No Email ID")
            }
            else{
                saveDataToStorage("emailId",contactDetailsText.emails[0])
            }

            // const response = await fetch('http://localhost:8080/getPhoneNumberDetails', {
            //     method: "POST", 
            //     mode: "cors", 
            //     cache: "no-cache",
            //     credentials: "same-origin",
            //     headers: {
            //       "Content-Type": "application/json",
            //     },
            //     redirect: "follow", 
            //     referrerPolicy: "no-referrer", 
            //     body: JSON.stringify({"phoneNumber" : request.data.phoneNumbers[0]} ), 
            //   });
            // console.log("My network request", response);
            // const phoneNumberScore = await response.json();
            const phoneNumberScore = 70
            // console.log(phoneNumberScore.data[0].value.score * 100);

            saveDataToStorage("phoneNumberScore",phoneNumberScore)

        }
    );

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'urlScore') {
        console.log("popup.js",request)
        if (request.data.urlScore < 70) {
            console.log("URL score is less than 70");
        }
    }
});
})


