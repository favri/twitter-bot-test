const twit = require ('twit');
const config = require ('./config');
const T = new twit (config);

let caritosId = '182386151';
// let stream = T.stream('statuses/filter', { follow: caritosId });
let answeredTweets = ['916308363922825216','916312666779586560','916309650580103168'];
;
const caritosTweets = function() {
  let params = {
    q: 'from:@Carito_granate to:@ElBaileDeOdin since:2017-10-05'
  };


  T.get('search/tweets', params, function(err, data) {
    if (!err) {
      // grab ID of tweet to reply
      data.statuses.forEach(s => {

        if (answeredTweets.indexOf(s.id_str) > -1) {
          console.log('Already Answered');
        }
        else {
          console.log('not answered ' + s.id_str);

          T.post('statuses/update', {
            status: '@' + s.user.screen_name + ' Besito chau. El Bot',
            in_reply_to_status_id: s.id_str
          }, (err, data, response) => {
            if (err) {
              console.log(err)
            } else {
              answeredTweets.push(s.id_str);
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
};

caritosTweets();
setInterval(caritosTweets,50000);