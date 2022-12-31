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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function beginSentimentProcess(videoId){
    var pageToken = undefined;
    for (var i = 0; i < 3; i++){
        await queryCommentData(videoId, pageToken)
        .then(commentsBatch => computeSentiment(commentsBatch))
        .then(nextPageToken => pageToken = nextPageToken)
        .catch(error => {
            document.getElementById('commentsAnalyzed').innerHTML = "No comments available.";
            document.getElementById('commentsAnalyzed').style.color = '#eb2c2c';
        });
        
        if (!pageToken){
            break;
        }
    }
}

async function queryCommentData(videoId, pageToken){    
    const k = ""; // Your Google API Key

    var URL = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=100&order=relevance&videoId=${videoId}&key=${k}`;
    if (pageToken){
        URL = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=100&order=relevance&pageToken=${pageToken}&videoId=${videoId}&key=${k}`;
    }
    
    return fetch(URL, { headers: { "Content-Type": "application/json" }})
    .then(response => response.json())
    .then((data) => {
        if (!data || data['error']) { throw new Error("No comments available."); }

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
        
        var likes = parseInt(commentsBatch.comments[index].likes);
        var likeScalar = likes == 0 ? 1 : likes ;

        if (intensity.compound > 0.75){
            analysisResults['strongly-positive'] += Math.abs(intensity.compound * likeScalar);
        }
        else if (intensity.compound > 0.25){
            analysisResults['positive'] += Math.abs(intensity.compound * likeScalar);
        }
        else if (intensity.compound < 0.25 && intensity.compound > -0.25){
            analysisResults['neutral'] += Math.abs(intensity.compound * likeScalar);
        }
        else if (intensity.compound < -0.75){
            analysisResults['negative'] += Math.abs(intensity.compound * likeScalar);
        }
        else if (intensity.compound < -0.25){
            analysisResults['strongly-negative'] += Math.abs(intensity.compound * likeScalar);
        }

        analysisResults['sentiment-sum'] += Math.abs(intensity.compound * likeScalar);
        analysisResults['comments-analyzed'] += 1;
        
        await sleep(10);

        updateSentimentVisual();
    }

    return commentsBatch.nextPageToken;
}

function roundDownFormat(value){
    return Math.floor(value * 10) / 10;
}

function updateSentimentVisual(){
    var sp = `${roundDownFormat(analysisResults['strongly-positive'] / analysisResults['sentiment-sum'] * 100)}%`;
    var p = `${roundDownFormat(analysisResults['positive'] / analysisResults['sentiment-sum'] * 100)}%`;
    var nn = `${roundDownFormat(analysisResults['neutral'] / analysisResults['sentiment-sum'] * 100)}%`;
    var n = `${roundDownFormat(analysisResults['negative'] / analysisResults['sentiment-sum'] * 100)}%`;
    var sn = `${roundDownFormat(analysisResults['strongly-negative'] / analysisResults['sentiment-sum'] * 100)}%`;

    document.getElementById('strongly-negative').style.width = sn;
    document.getElementById('negative').style.width = n;
    document.getElementById('neutral').style.width = nn;
    document.getElementById('positive').style.width = p;
    document.getElementById('strongly-positive').style.width = sp;

    document.getElementById('strongly-negative-li').innerHTML = `Strongly Negative: ${sn}`;
    document.getElementById('strongly-negative').title = `Strongly Negative: ${sn}`;
    document.getElementById('negative-li').innerHTML = `Negative: ${n}`;
    document.getElementById('negative').title = `Negative: ${n}`;
    document.getElementById('neutral-li').innerHTML = `Neutral: ${nn}`;
    document.getElementById('neutral').title = `Neutral: ${nn}`;
    document.getElementById('positive-li').innerHTML = `Positive: ${p}`;
    document.getElementById('positive').title = `Positive: ${p}`;
    document.getElementById('strongly-positive-li').innerHTML = `Strongly Positive: ${sp}`;
    document.getElementById('strongly-positive').title = `Strongly Positive: ${sp}`;

    document.getElementById('commentsAnalyzed').innerHTML = `Comments Analyzed: ${analysisResults['comments-analyzed']}`;
}
