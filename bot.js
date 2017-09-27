/**
 * Created by cliengo on 25/09/17.
 */

var twit = require ('twit');
var config = require ('./config.js');
var T = new twit (config);
var cfg = require('./cf');

var retweet = function() {
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
        console.log('Retweeted!!!');
      }
      // if there was an error while tweeting
      if (err) {
        console.log('Something went wrong while RETWEETING... Duplication maybe...');
      }
    });
  }
  // if unable to Search a tweet
  else {
    console.log('Something went wrong while SEARCHING...');
  }
});
};

// grab & retweet as soon as program is running...
retweet();
// retweet in every 50 minutes
setInterval(retweet, 3000000);

// Putting together a context free grammar to make tweets
var cfree = new cfg.ContextFree();
cfree.addRule('S', ['TOPIC', 'THING', 'with', 'TECH']);

// Thing can expand to join with another topic
cfree.addRule('THING', ['TOPIC', 'THING', 'with', 'TECH']);

// Tech can expand to be multiple technologies
cfree.addRule('TECH', ['TECH', 'and', 'TECH']);
cfree.addRule('TECH', ['TECH', 'and', 'TECH', 'plus', 'TECH']);

// TOPICS
cfree.addRule('TOPIC', ['Climate Change']);
cfree.addRule('TOPIC', ['Poetry']);
cfree.addRule('TOPIC', ['Music Box']);

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
}
