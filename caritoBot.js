const twit = require ('twit');
const config = require ('./config');
const T = new twit (config);
const mongodb = require('mongodb');

const uri = 'mongodb://favri:fabric10@ds115045.mlab.com:15045/heroku_xzvnnj4p';
// const caritosId = '182386151';
const tweetsArray = [];
const getIds = function (){
  mongodb.MongoClient.connect(uri, function(err, db) {
    if(err) throw err;

    const answeredTweets = db.collection('answeredTweets');
    answeredTweets.find().toArray(function (err, docs) {
      if(err) throw err;
      docs.forEach(function (doc) {
        tweetsArray.push(doc._id);
      });
    });

    let params = {
      q: 'from:@Carito_granate to:@ElBaileDeOdin since:2017-10-05'
    };

    T.get('search/tweets', params, function(err, data) {
      if (!err) {

        // grab ID of tweet to reply
        data.statuses.forEach(s => {

          if (tweetsArray.indexOf(s.id_str) > -1) {
            console.log('Already Answered');
          }
          else {
            console.log('not answered');

            T.post('statuses/update', {
              status: '@' + s.user.screen_name + ' Besito chau. El Bot',
              in_reply_to_status_id: s.id_str
            }, (err, data, response) => {
              if (err) {
                console.log(err)
              } else {
                answeredTweets.insertOne({"_id": s.id_str});
                console.log(`${data.text} tweeted!`)
              }
            })
          }
        })

      }
      else {
        console.log('Something went wrong while SEARCHING...');
      }
    });
  });
};

getIds();
setInterval(getIds,50000);