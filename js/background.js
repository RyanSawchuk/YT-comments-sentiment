chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
});

chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
    if (tab.url.includes("www.youtube.com/watch?v=")){
        chrome.tabs.sendMessage(tabId, 
            { message: "URLUpdate", url: tab.url, title: tab.title }, 
            function(response) { 
                console.log(response.message); 
            }
        );
    }
});

console.log('background.js ran.')