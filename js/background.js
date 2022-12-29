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

/* Wait for user to load comments

function waitForEl(el) {
  return new Promise((resolve, reject) => {
    const intervalId = setInterval(() => {
      if (document.querySelector(el)) {
        clearInterval(intervalId);
        resolve();
      }
    }, 500);
  });
}

waitForEl("#comments #header-author").then(() => {
  // comments should be loaded here
});

*/

console.log('background.js ran.')