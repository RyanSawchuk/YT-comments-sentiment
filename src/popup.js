'use strict';

import './popup.css';

const sentimentProcess = require('./sentimentProcess.js');

(function () {
  async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }

  const start = async function() {
      var tab = await getCurrentTab();

      if (tab && tab.url && tab.url.includes("www.youtube.com/watch?v=")){
          document.getElementById("videoTitle").innerHTML = tab.title;
          var videoId = tab.url.split('=')[1];

          await sentimentProcess.beginSentimentProcess(videoId);
      }
      else {
          document.getElementById("title").innerHTML = "No active YouTube video";
      }
  }
  
  //document.getElementsByClassName('block').tooltip();

  start();

})();
