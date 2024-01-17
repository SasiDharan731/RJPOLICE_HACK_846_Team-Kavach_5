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
// function saveDataToStorage(key, data) {
//     return new Promise((resolve, reject) => {
//       chrome.storage.local.set({ [key]: data }, function () {
//         if (chrome.runtime.lastError) {
//           reject(new Error(chrome.runtime.lastError));
//         } else {
//           console.log(`Data saved for key '${key}'.`);
//           resolve();
//         }
//       });
//     });
// }
var backgroundPort;
chrome.tabs.onActivated.addListener(function (activeInfo) {

    chrome.runtime.onMessage.addListener(
        async function(request, sender, sendResponse) {
        console.log(sender.tab ?
                    "from a content script:" + sender.tab.url :
                    "from the extension");
        console.log(request)

        if (request.action === "htmlText")

            sendResponse("Got the Html text successfully!");
            let contactDetailsText = extractContacts(request.data)
            console.log(contactDetailsText.phones[0])
            
            //make a fetch request to phone number validation
            let phoneNumberScore = null;

            // Listen for connections from other scripts
            chrome.runtime.onConnect.addListener(function(port) {
                backgroundPort = port;

                // Listen for messages from the connected script
                port.onMessage.addListener(function(msg) {
                console.log("Background received:", msg);

                // Respond to the connected script
                port.postMessage({ contactDetails: [contactDetailsText,{phoneNumberScore : phoneNumberScore}]});    
                });
            });
        }
    );
})


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'urlScore') {
        console.log("popup.js",request)
        if (request.data.urlScore < 70) {
            console.log("URL score is less than 70");

        }
    }
});

function getNewRules() {
    return [
        {
            "id": 1,
            "priority": 1,
            "action": { "type": "block" },
            "condition": {"urlFilter": "https://developer.chrome.com/docs/extensions/reference/api/webRequest#:~:text=Note%3A%20As%20of%20Manifest%20V3,and%20available%20for%20normal%20use.", "resourceTypes": ["main_frame"] }
        }
    ]
}
async function updateDynamicRules() {
    try {
      // Get arrays containing new and old rules
      const newRules = await getNewRules();
      const oldRules = await chrome.declarativeNetRequest.getDynamicRules();
      const oldRuleIds = oldRules.map(rule => rule.id);
  
      // Use the arrays to update the dynamic rules
      await chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: oldRuleIds,
        addRules: newRules
      });
  
      console.log('Dynamic rules updated successfully.');
    } catch (error) {
      console.error('Error updating dynamic rules:', error);
    }
  }