/**
 * Created by cliengo on 25/09/17.
 */

const twit = require ('twit');
const config = require ('./config');
const T = new twit (config);

const retweetCss = function() {
  let params = {
    q: '#CSS, #JavaScript , #Scratch',
    result_type: 'popular',
    lang: 'es'
  };

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
retweetCss();
// retweet in every 12 hours
setInterval(retweetCss, 28200000);
