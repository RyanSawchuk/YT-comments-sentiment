'use strict';

const pageTitle = document.head.getElementsByTagName('title')[0].innerHTML;
console.log(
  `Page title is: '${pageTitle}' - evaluated by Chrome extension's 'contentScript.js' file`
);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "URLUpdate"){
      if (lastUrl === "" || lastUrl != request.url){
          lastUrl = request.url;
          sendResponse({ message: `Starting sentiment process.` });
          //beginSentimentProcess(title);
      }
      else {
          sendResponse({ message: "No new YouTube page." });
      }
  }
});