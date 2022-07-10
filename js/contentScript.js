
var lastUrl = "";
var initialRun = true;

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (request.message === "URLUpdate"){
        //console.log(`LAST: ${lastUrl}, NEW: ${request.url}`)
        console.log(lastUrl === "", lastUrl != request.url)
        if (lastUrl === "" || lastUrl != request.url){
            lastUrl = request.url;

            await sleep(5000);

            beginSentimentProcess();
            //console.log(document.readyState, document.title)
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
    var filteredComments = [];
    var commentsContainer = document.getElementById("contents");
    //var comments = commentsContainer.getElementsByClassName("style-scope ytd-item-section-renderer");
    //var comments = document.getElementsByTagName("yt-formatted-string")
    //var comments = document.getElementsByTagName("div");

    var _1 = document.getElementsByTagName("ytd-comment-thread-renderer")
    console.log(_1)
    for (var comment in _1){
        //console.log(comment)
    }
    /*
    var comments = document.getElementsByTagName("span")//.getElementsByClassName("style-scope yt-formatted-string");
    for (var i in comments){
        //console.log(comments[i])
        if (comments[i].className === "style-scope yt-formatted-string"){
            filteredComments.push(comments[i].innerHTML)
        }
    }
    console.log(filteredComments)
    */
}

function computeSentiment(){

}

function displaySentimentVisual(){

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

if (initialRun){
    initialRun = false;
    //await sleep(5000);
    console.log('Initial run.')
    //beginSentimentProcess();
}

console.log('contentScript.js ran.')