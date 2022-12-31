# <img src="public/icons/icon_48.png" width="45" align="left"> YouTube Comments Sentiment

Visualize the aggregate sentiment of a YouTube video's comments on an adapted Likert scale.

This extension uses the specialized social media [VADER Sentiment Analysis](https://github.com/vaderSentiment/vaderSentiment-js) algorithms to evaluate the sentiment of the top 300 comments by relevance. 
The compound sentiment value for a comment is scaled by the amount of likes the comment has received. 

Scaling by likes allows for an accurate depiction of the sentiment with a low sample size of comments. The sentiment analysis results act as a loose proxy for the Like-to-Dislike ratio, but are not always indicative of the true Like-to-Dislike ratio.


## Install

[**Chrome** extension]() <!-- TODO: Add chrome extension link inside parenthesis -->

### Manual Install

1. ```git clone``` this repo.
2. Add your (Google API Key)[https://support.google.com/googleapi/answer/6158862?hl=en] to the variable ```k``` in https://github.com/RyanSawchuk/YT-comments-sentiment/blob/5e13d9a610dd102ef563c14e79bf471fefca5de1/src/sentimentProcess.js#L37
3. ```npm run build``` from the root directory of the project.
4. Open the extensions management page in Chrome or Brave.
5. Upload the ```build``` folder through the ```Load Unpacked``` button in the top left.
6. Pin the extension.

---

This project was bootstrapped with [Chrome Extension CLI](https://github.com/dutiyesh/chrome-extension-cli)

