/**
 * Created by cliengo on 25/09/17.
 */

var twit = require ('twit');
var redis = require('redis');
var config = require ('./config.js');
var T = new twit (config);
var cfg = require('./cf');

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
// retweet in every 12 hours
setInterval(retweetChatbot, 86400000);
// retweet in every 6 hours
setInterval(retweetNodeJs, 21600000);

/*// Putting together a context free grammar to make tweets
var cfree = new cfg.ContextFree();
cfree.addRule('S', ['TOPIC', 'THING', 'with', 'TECH']);

// Thing can expand to join with another topic
cfree.addRule('THING', ['TOPIC', 'THING', 'with', 'TECH']);

// Tech can expand to be multiple technologies
cfree.addRule('TECH', ['TECH', 'and', 'TECH']);
cfree.addRule('TECH', ['TECH', 'and', 'TECH', 'plus', 'TECH']);

// TOPICS
cfree.addRule('TOPIC', ['Estoy aprendiendo']);
cfree.addRule('TOPIC', ['Estoy probando']);
cfree.addRule('TOPIC', ['Soy un bot']);

// THINGS
cfree.addRule('THING', ['App']);
cfree.addRule('THING', ['Sculpture']);
cfree.addRule('THING', ['Wearable']);

// TECHS
cfree.addRule('TECH', ['JavaScript']);
cfree.addRule('TECH', ['Arduino']);
cfree.addRule('TECH', ['Oculus Rift']);
cfree.addRule('TECH', ['Makerbot']);
cfree.addRule('TECH', ['Cardboard']);
cfree.addRule('TECH', ['Pencil']);
cfree.addRule('TECH', ['Processing']);
cfree.addRule('TECH', ['Python']);

// Start once
tweeter();

// Once every N milliseconds
setInterval(tweeter, 60*5*1000);

// Here is the bot!
function tweeter() {

  // This is a random number bot
  var tweet = cfree.getExpansion('S');

  // Post that tweet!
  T.post('statuses/update', { status: tweet }, tweeted);

  // Callback for when the tweet is sent
  function tweeted(err, data, response) {
    if (err) {
      console.log(err);
    } else {
      console.log('Success: ' + data.text);
      //console.log(response);
    }
  };
}*/

// var stream = T.stream('statuses/filter', { track: 'Donde está Santiago Maldonado?' });
//
// var url = require('url');
// var redisURL = url.parse(process.env.REDISCLOUD_URL || 'redis://127.0.0.1:6379');
// var client = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true});
// if (process.env.REDISCLOUD_URL) {
//   client.auth(redisURL.auth.split(":")[1]);
// }
//
// var REDIS_KEY = 'repliedTo';
// function processTweet(tweet) {
//   client.sadd(REDIS_KEY, tweet.user.id_str, function(err, reply) {
//     if (err) {
//       console.log(err);
//     } else if (reply == 1 || tweet.user.screen_name == process.env.TWITTER_DEBUG_USER) {
//       console.log('This is a new user OR it is the debug user');
//       // replyTo(tweet, 'Good evening!');
//     } else {
//       console.log('We have seen this user before');
//     }
//   });
// }
//
//
// stream.on('tweet', function (tweet) {
//   console.log(tweet.text);
// });
