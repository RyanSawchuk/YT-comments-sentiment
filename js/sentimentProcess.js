
async function beginSentimentProcess(videoId){
    for (var i = 0; i < 10; i++){
        var comments = await queryCommentData(videoId);

        await computeSentiment(comments);

        //await displaySentimentVisual();

        break;
    }
}

async function queryCommentData(videoId){    
    const youtubeAPIKey = "AIzaSyAIMOdtojUDvFctt0xfoqcRYXqztBqASKw";
    var URL = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=100&order=relevance&videoId=${videoId}&key=${youtubeAPIKey}`

    var result = {};

    fetch(URL, headers = { "Content-Type": "application/json" })
    .then(response => response.json())
    .then((data) => {
        if (!data) { throw new Error("Empty response."); }

        result['totalResults'] = data['pageInfo']['totalResults'];
        result['nextPageToken'] = data['nextPageToken'];

        result['comments'] = [];

        for (var index in data.items){
            extractedData = {
                "comment": data.items[index]['snippet']['topLevelComment']['snippet']['textOriginal'],
                "likes": data.items[index]['snippet']['topLevelComment']['snippet']['likeCount'],
                "author": data.items[index]['snippet']['topLevelComment']['snippet']['authorDisplayName'],
                "replies": []
            };

            if (data.items[index]['replies']){
                for (var replyIndex in data.items[index]['replies'].comments){
                    extractedData["replies"].push({
                        "comment": data.items[index]['replies'].comments[replyIndex]['snippet']['textOriginal'],
                        "likes": data.items[index]['replies'].comments[replyIndex]['snippet']['likeCount'],
                        "author": data.items[index]['replies'].comments[replyIndex]['snippet']['authorDisplayName']
                    });
                }
            }

            result['comments'].push(extractedData);
        }
    })
    .catch(err => console.log(err))
    console.log(result)
    return result;
}

async function computeSentiment(comments){
    for (var index in comments.comments){
        comments.comments[index]
    }
}

async function displaySentimentVisual(){

}
