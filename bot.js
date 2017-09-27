var twit = require ('twit');
var config = require ('./config.js');
var T = new twit (config);

var retweetChatbot = function() {
  var params = {
    q: '#chatbot, #Chatbot',
    result_type: 'recent',
    lang: 'es'
  }

T.get('search/tweets', params, function(err, data) {
  // if there no errors
  if (!err) {
    // grab ID of tweet to retweet
    var retweetId = data.statuses[0].id_str;
    // Tell TWITTER to retweet
    T.post('statuses/retweet/:id', {
      id: retweetId
    }, function(err, response) {
      if (response) {
        console.log('Retweeted Chatbot!!!');
      }
      // if there was an error while tweeting
      if (err) {
        console.log('Something went wrong while RETWEETING Chatbot... Duplication maybe...');
      }
    });
  }
  // if unable to Search a tweet
  else {
    console.log('Something went wrong while SEARCHING Chatbot...');
  }
});
};
var retweetNodeJs = function() {
  var params = {
    q: '#NodeJs',
    result_type: 'popular',
    lang: 'en'
  }

T.get('search/tweets', params, function(err, data) {
  // if there no errors
  if (!err) {
    // grab ID of tweet to retweet
    var retweetId = data.statuses[0].id_str;
    // Tell TWITTER to retweet
    T.post('statuses/retweet/:id', {
      id: retweetId
    }, function(err, response) {
      if (response) {
        console.log('Retweeted Node!!!');
      }
      // if there was an error while tweeting
      if (err) {
        console.log('Something went wrong while RETWEETING Node... Duplication maybe...');
      }
    });
  }
  // if unable to Search a tweet
  else {
    console.log('Something went wrong while SEARCHING Node...');
  }
});
};

// grab & retweet as soon as program is running...
retweetChatbot();
retweetNodeJs();
// retweet in every 50 minutes
setInterval(retweetChatbot, 21400000);
// retweet in every 50 minutes
setInterval(retweetNodeJs, 18000000);
