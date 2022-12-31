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
      document.getElementById('no-video-container').style.visibility = 'hidden';
      document.getElementById("videoTitle").innerHTML = tab.title.replace(" - YouTube", '');
      var videoId = tab.url.split('=')[1];
      setSentimentVisual();
      await sentimentProcess.beginSentimentProcess(videoId);
    }
    else {
      //document.body.style.width = '300px';
      //document.body.style.height = '75px';
      document.getElementById('no-video-container').style.visibility = 'visible';
      document.getElementById('main-container').style.visibility = 'hidden';
    }
  }
  
  function setSentimentVisual(){
    document.getElementById('strongly-negative').style.width = '1%';
    document.getElementById('negative').style.width = '1%';
    document.getElementById('neutral').style.width = '96%';
    document.getElementById('positive').style.width = '1%';
    document.getElementById('strongly-positive').style.width = '1%';
  }

  start();

})();
