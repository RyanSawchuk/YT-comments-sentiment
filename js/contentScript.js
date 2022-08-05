
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
    loadComments();

    collectCommentData();

    computeSentiment();

    displaySentimentVisual();
}

function loadComments(){
    //var items = document.getElementsByClassName("style-scope ytd-item-section-renderer"); // id="contents"

    var containers = [];
    var items = document.getElementsByTagName("ytd-comments"); 
    for (var i in items){
        if (items[i].id === "comments"
         && items[i].querySelector("#continuations") != null){

            items[i].setAttribute("position", "absolute");
            items[i].setAttribute("z-index", -999);
            items[i].hidden = true;
            
            //hight, width
            items[i].getBoundingClientRect();

            containers.push(items[i]);
        }
    }
    
    for (var i = 0; i < 12; i++){
        window.dispatchEvent(new Event("scroll"));
    }
    window.dispatchEvent(new Event("scroll"));

    console.log("COMMENTS LOADED");
}

function collectCommentData(){    
    var comments = document.getElementsByTagName("yt-formatted-string");
    var filteredComments = [];
    if (comments){
        for (var i in comments){
            if (comments[i].className === "style-scope ytd-comment-renderer"
             && comments[i].slot === "content"){
                //console.log(comments[i].innerHTML)
                filteredComments.push(comments[i].innerHTML);
            }
        }
    }
    console.log(`${filteredComments.length} COMMENTS`);
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