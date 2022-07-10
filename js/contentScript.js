
var lastUrl = "";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "URLUpdate"){
        //console.log(`LAST: ${lastUrl}, NEW: ${request.url}`)
        if (lastUrl === "" || lastUrl != request.url){
            lastUrl = request.url;
            
            beginSentimentProcess();
            console.log(document.title)
            sendResponse({ message: `Starting sentiment process.` });
        }
        else {
            sendResponse({ message: "No new YouTube page." });
        }
    }
});

function beginSentimentProcess(){
    collectCommentData();

    computeSentiment();

    displaySentimentVisual();
}

function collectCommentData(){

}

function computeSentiment(){

}

function displaySentimentVisual(){

}

console.log('contentScript.js ran.')