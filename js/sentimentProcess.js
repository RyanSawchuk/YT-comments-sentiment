
async function beginSentimentProcess(videoId){
    console.log("START SentimentProcess");

    await createClient();

    for (var i = 0; i < 10; i++){
        await queryCommentData(videoId);

        await computeSentiment();

        await displaySentimentVisual();

        break;
    }
}

async function createClient(){
    const youtubeAPIKey = "AIzaSyAIMOdtojUDvFctt0xfoqcRYXqztBqASKw";
    gapi.client.setApiKey(youtubeAPIKey);
    gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
}

async function queryCommentData(videoId){    
    
}

async function computeSentiment(){

}

async function displaySentimentVisual(){

}
