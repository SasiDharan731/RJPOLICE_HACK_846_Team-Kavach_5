let htmlBodyText = document.body.innerText

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

chrome.runtime.sendMessage({ action : "htmlText", data : htmlBodyText },function(response) {
    console.log(response)
})

var activeTabUrl

chrome.tabs.query({ active: true, currentWindow: true },
    async function(tabs) {
    activeTabUrl = tabs[0].url;
});


// try {
//     const urlValidationResponse = await fetch('http://localhost:8080/getUrlScore', {
//         method: "POST",
//         mode: "cors",
//         cache: "no-cache",
//         credentials: "same-origin",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         redirect: "follow",
//         referrerPolicy: "no-referrer",
//         body: JSON.stringify({"url" : activeTabUrl}),
//     });

//     if (!urlValidationResponse.ok) {
//         throw new Error(`HTTP error! Status: ${urlValidationResponse.status}`);
//     }

//     const urlScore = await urlValidationResponse.json();
//     console.log(urlScore.url_score);

//     saveDataToStorage("urlScore", urlScore);
// } catch (error) {
//     console.error("Error during fetch:", error);
// }


chrome.runtime.sendMessage({ action : "urlScore", data : [urlScore , activeTabUrl] },function(response) {
})