'use strict';

const vader = require('vader-sentiment');

var analysisResults = {
    "comments-analyzed": 0,
    "sentiment-sum": 0,
    "strongly-negative": 0,
    "negative": 0,
    "neutral": 0,
    "positive": 0,
    "strongly-positive": 0
}

export async function beginSentimentProcess(videoId){
    for (var i = 0; i < 10; i++){
        
        queryCommentData(videoId)
        .then(commentsBatch => computeSentiment(commentsBatch))
        .then(result => console.log(result))
        
        //await displaySentimentVisual();

        break;
    }
}


async function queryCommentData(videoId){    
    const youtubeAPIKey = "AIzaSyAIMOdtojUDvFctt0xfoqcRYXqztBqASKw";
    var URL = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=100&order=relevance&videoId=${videoId}&key=${youtubeAPIKey}`;

    return fetch(URL, { headers: { "Content-Type": "application/json" }})
    .then(response => response.json())
    .then((data) => {
        if (!data) { throw new Error("Empty response."); }
        
        var result = {};
        result['totalResults'] = data['pageInfo']['totalResults'];
        result['nextPageToken'] = data['nextPageToken'];

        result['comments'] = [];

        for (var index in data.items){
            var extractedData = {
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

        return result;
    })
    .catch(err => console.log(err))
}


async function computeSentiment(commentsBatch){
    
    for (var index in commentsBatch.comments){
        const intensity = vader.SentimentIntensityAnalyzer.polarity_scores(commentsBatch.comments[index].comment);
        console.log(intensity, commentsBatch.comments[index])
        
        var likes = parseInt(commentsBatch.comments[index].likes);
        var likeScalar = likes == 0 ? 1 : likes ;

        if (intensity.compound > 0.75){
            analysisResults['strongly-positive'] += intensity.compound * likeScalar;
        }
        else if (intensity.compound > 0.25){
            analysisResults['positive'] += intensity.compound * likeScalar;
        }
        else if (intensity.compound < 0.25 && intensity.compound > -0.25){
            analysisResults['neutral'] += intensity.compound * likeScalar;
        }
        else if (intensity.compound < -0.75){
            analysisResults['negative'] += intensity.compound * likeScalar;
        }
        else if (intensity.compound < -0.25){
            analysisResults['strongly-negative'] += intensity.compound * likeScalar;
        }

        analysisResults['sentiment-sum'] += intensity.compound * likeScalar;
        analysisResults['comments-analyzed'] += 1;
    }

    return true;
}


function updateSentimentVisual(){

}
