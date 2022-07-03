chrome.runtime.onInstalled.addListener(() => {
    //chrome.storage.sync.set({ color });
    console.log('Extension installed');
});

function injectedFunction() {
    alert('Injected')
}

chrome.tabs.onActivated.addListener(info => {
    console.log("Activated: ", info)
    chrome.scripting.executeScript({
        target: { tabId: info.tabId },
        files: ['/js/contentScript.js']
        //function: injectedFunction
    });
});

chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
    console.log('Update: ', tabId, tab, info)
    if (tab.url.includes("www.youtube.com/watch?v=")){
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['/js/contentScript.js']
            //function: injectedFunction
        });
        console.log('Update')
    }
});

chrome.action.onClicked.addListener(info => {
    console.log('Click: ', info)
    chrome.scripting.executeScript({
        target: { tabId: info.tabId },
        files: ['/js/contentScript.js']
        //function: injectedFunction
    });
});

console.log('background.js ran.')