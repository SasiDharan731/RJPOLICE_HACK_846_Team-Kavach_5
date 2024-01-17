let htmlBodyText = document.body.innerText

chrome.runtime.sendMessage({ action : "htmlText", data : htmlBodyText },function(response) {
    console.log(response)
})

var activeTabUrl

chrome.tabs.query({ active: true, currentWindow: true }, 
    async function(tabs) {
    activeTabUrl = tabs[0].url;
});


   // const urlValidationResponse = await fetch('http://localhost:8080/getUrlScore', {
    // method: "POST", 
    // mode: "cors", 
    // cache: "no-cache",
    // credentials: "same-origin",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    // redirect: "follow",  
    // referrerPolicy: "no-referrer", 
    // body: JSON.stringify({"url" : activeTabUrl } ), 
    // });

    // const urlScore = await urlValidationResponse.json()
    // console.log(urlScore.url_score)

let urlScore = 82
chrome.runtime.sendMessage({ action : "urlScore", data : [urlScore , activeTabUrl] },function(response) {

})
    