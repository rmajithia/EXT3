
var menuItem = {
    "id": "createKB",
    "title": "Create KB Now",
    "contexts": ["selection"]
};
var menuItem1 = {
    "id": "Speak",
    "title": "Speak Now",
    "contexts": ["selection"]
};
var menuItem2 = {
    "id": "sNowCommunity",
    "title": "Search Servicenow community",
    "contexts": ["selection"]
};
chrome.contextMenus.create(menuItem);
chrome.contextMenus.create(menuItem1);
chrome.contextMenus.create(menuItem2);

function isInt(value) {
  return !isNaN(value) && 
         parseInt(Number(value)) == value && 
         !isNaN(parseInt(value, 10));
}
 
function fixedEncodeURI (str) {
    return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
}

chrome.contextMenus.onClicked.addListener(function(clickData){   
    if (clickData.menuItemId == "createKB" && clickData.selectionText){    
        /*var speakText='Creating KB Article for you...';
         chrome.tts.speak(speakText,
                        {
                            'rate': 0.7
                        });         
       
       */
      var selectionText=clickData.selectionText;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {action: "open_dialog_box",selectedText:selectionText}, function(response) {});  
    });

      
    }
    if (clickData.menuItemId == "Speak" && clickData.selectionText){        
       chrome.tts.speak(clickData.selectionText,
                        {
                            'rate': 0.7
                        });         
    }

    if (clickData.menuItemId == "sNowCommunity" && clickData.selectionText){    
        var wikiUrl = "https://www.google.com/#q=servicenow community+" + fixedEncodeURI(clickData.selectionText);
        var createData = {
            "url": wikiUrl,
            "type": "popup",
            "top": 5,
            "left": 5,
            "width": screen.availWidth/2,
            "height": screen.availHeight/2
        };              
        chrome.windows.create(createData, function(){});        
    }


});


chrome.runtime.onMessage.addListener(function (msg, sender) {
  // First, validate the message's structure
  if ((msg.from === 'content') && (msg.subject === 'showPageAction')) {
    // Enable the page-action for the requesting tab
    chrome.pageAction.show(sender.tab.id);
  }
});

chrome.storage.onChanged.addListener(function(changes, storageName){
    chrome.browserAction.setBadgeText({"text": "40"});
});