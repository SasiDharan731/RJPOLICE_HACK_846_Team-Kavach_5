var popupPort = chrome.runtime.connect({ name: "popup" });

// Listen for messages from the background script
popupPort.onMessage.addListener(function(msg) {
    console.log(msg)
  console.log("Popup received:", msg.contactDetails[0].phones[0]);
  document.getElementById("phoneNumber").innerText = msg.contactDetails[0].phones[0]
 console.log(msg.contactDetails[1].phoneNumberScore)

  if (msg.contactDetails[1].phoneNumberScore > 70) {
        document.getElementById('phoneNumberScoreImg').src = "/images/trust.png"
  }
  else if (msg.contactDetails[1].phoneNumberScore < 70 && msg.contactDetails[1].phoneNumberScore > 0) {
    document.getElementById('phoneNumberScoreImg').src = "./images/danger.png"
  }
  else{
    document.getElementById('phoneNumberScoreImg').src = './images/close.png'
  }
});


chrome.tabs.query({ active: true, currentWindow: true }, 
    async function(tabs) {
    var activeTabUrl = tabs[0].url;
    console.log(activeTabUrl)
    document.getElementById('url').innerText = activeTabUrl

    document.getElementById('website_logo').src = tabs[0].favIconUrl
});


