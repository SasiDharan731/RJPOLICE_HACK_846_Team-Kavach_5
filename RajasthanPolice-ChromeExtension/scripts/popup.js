// var popupPort = chrome.runtime.connect({ name: "popup" });

// Listen for messages from the background script
// popupPort.onMessage.addListener(function(msg) {
//     console.log(msg)
//   console.log("Popup received:", msg.contactDetails[0].phones[0]);
//   document.getElementById("phoneNumber").innerText = msg.contactDetails[0].phones[0]
//  console.log(msg.contactDetails[1].phoneNumberScore)

//   if (msg.contactDetails[1].phoneNumberScore > 70) {
//         document.getElementById('phoneNumberScoreImg').src = "/images/trust.png"
//   }
//   else if (msg.contactDetails[1].phoneNumberScore < 70 && msg.contactDetails[1].phoneNumberScore > 0) {
//     document.getElementById('phoneNumberScoreImg').src = "./images/danger.png"
//   }
//   else{
//     document.getElementById('phoneNumberScoreImg').src = './images/close.png'
//   }
// });

chrome.storage.local.get(['phoneNumber'], function(result) {
  console.log(chrome.storage.local);
  console.log('Retrieved data:', result.phoneNumber);
  document.getElementById('phoneNumber').textContent = result.phoneNumber
});

chrome.storage.local.get(['phoneNumberScore'], function(result) {
  console.log(chrome.storage.local);
  console.log('Retrieved data:', result.phoneNumberScore);
  if (result.phoneNumberScore > 30) {
    document.getElementById('phoneNumberScoreImg').src = "./images/danger.png"
  }
  else if(result.phoneNumberScore == 0){
    document.getElementById('phoneNumberScoreImg').src = "./images/close.png"
  }
  else{
    document.getElementById('phoneNumberScoreImg').src = "./images/trust.png"
  }
});

chrome.storage.local.get(['emailId'], function(result) {
  console.log(chrome.storage.local);
  console.log('Retrieved data:', result.emailId);
  document.getElementById('emailId').textContent = result.emailId
});

chrome.storage.local.get(['emailIdScore'], function(result) {
  console.log(chrome.storage.local);
  console.log('Retrieved data:', result.emailIdScore);
  if (result.phoneNumberScore > 30) {
    document.getElementById('emailIdScoreImg').src = "./images/danger.png"
  }
  else if(result.phoneNumberScore == 0){
    document.getElementById('emailIdScoreImg').src = "./images/close.png"
  }
  else{
    document.getElementById('emailIdScoreImg').src = "./images/trust.png"
  }
});

chrome.storage.local.get(['urlScore'],
async function(result) {
  console.log(chrome.storage.local);
  console.log('Retrieved data:', result.urlScore);
  document.getElementById('urlScore').textContent = result.urlScore
});

chrome.tabs.query({ active: true, currentWindow: true },
    async function(tabs) {
    var activeTabUrl = tabs[0].url;
    console.log(activeTabUrl)
    document.getElementById('url').innerText = activeTabUrl

    document.getElementById('website_logo').src = tabs[0].favIconUrl
});