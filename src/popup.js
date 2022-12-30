'use strict';

import './popup.css';

const sentimentProcess = require('./sentimentProcess.js');

(function () {
  async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }

  function setFigureValues(){
    var text = '20%';
    document.getElementById('strongly-negative').style.width = text;
    document.getElementById('strongly-negative').innerHTML = text;
    document.getElementById('negative').style.width = text;
    document.getElementById('negative').innerHTML = text;
    document.getElementById('neutral').style.width = text;
    document.getElementById('neutral').innerHTML = text;
    document.getElementById('positive').style.width = text;
    document.getElementById('positive').innerHTML = text;
    document.getElementById('strongly-positive').style.width = text;
    document.getElementById('strongly-positive').innerHTML = text;
  }

  const start = async function() {
      var tab = await getCurrentTab();

      if (tab && tab.url && tab.url.includes("www.youtube.com/watch?v=")){
          document.getElementById("videoTitle").innerHTML = tab.title;
          var videoId = tab.url.split('=')[1];

          setFigureValues();

          await sentimentProcess.beginSentimentProcess(videoId);
      }
      else {
          document.getElementById("title").innerHTML = "No active YouTube video";
      }
  }
  
  //document.getElementsByClassName('block').tooltip();

  start();

})();
