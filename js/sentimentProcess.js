
async function beginSentimentProcess(videoId){
    console.log("START SentimentProcess");

    for (var i = 0; i < 10; i++){
        await queryCommentData(videoId);

        await computeSentiment();

        await displaySentimentVisual();

        break;
    }
}

async function queryCommentData(videoId){    
    const youtubeAPIKey = "AIzaSyAIMOdtojUDvFctt0xfoqcRYXqztBqASKw";
    var URL = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=100&order=relevance&videoId=${videoId}&key=${youtubeAPIKey}`

    fetch(URL, headers = { "Content-Type": "application/json" })
        .then(response => response.json())
        .then((data) => console.log(data))
        .catch(err => console.log(err))
}

async function computeSentiment(){

}

async function displaySentimentVisual(){

}
