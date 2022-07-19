
var lastUrl = "";
var initialRun = true;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "URLUpdate"){
        if (lastUrl === "" || lastUrl != request.url){
            lastUrl = request.url;
            sendResponse({ message: `Starting sentiment process.` });
            beginSentimentProcess(title);
        }
        else {
            sendResponse({ message: "No new YouTube page." });
        }
    }
});


async function beginSentimentProcess(){
    await sleep(5000);
    console.log(document.title)

    collectCommentData();

    computeSentiment();

    displaySentimentVisual();
}

function collectCommentData(){
    var items = document.getElementsByClassName("style-scope ytd-item-section-renderer"); // id="contents"

    var container = [];//document.getElementById("contents");
    for (var i in items){
        if (items[i].id === "contents"
         && items[i].tagName.toLowerCase() === "div"){
            //console.log(comments[i].innerHTML)
            container.push(comments[i]);
            console.log(comments[i])
        } 
    }
    
    var comments = document.getElementsByTagName("yt-formatted-string");
    var filteredComments = [];
    for (var i in comments){
        if (comments[i].className === "style-scope ytd-comment-renderer"
         && comments[i].slot === "content"){
            //console.log(comments[i].innerHTML)
            filteredComments.push(comments[i].innerHTML);
        }
    }
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