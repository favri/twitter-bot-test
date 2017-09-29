const twit = require ('twit');
const config = require ('./config');
const T = new twit (config);
const https = require ('https');

let imgsObj = [];
let postImgObj = {};
let position = Math.floor(Math.random() * 10) + 1;

https.get('https://api.unsplash.com/photos/curated/?client_id=1d92ead385c3a261431126c2c906ed9d6961c6d55130e373d8edaac5ad60d052', (resp) => {
  let data = '';
  // console.log('arguments', res.data);

// A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

// The whole response has been received. Print out the result.
  resp.on('end', () => {

    imgsObj = JSON.parse(data);
    postImgObj= imgsObj[position];
    console.log(postImgObj.urls.full);

      T.post('statuses/update', {
  status: 'Foto del día: ' +  postImgObj.urls.full + 'via #unsplash'
}, (err, data, response) => {
  if (err) {
    console.log(err)
  } else {
    console.log(`${data.text} tweeted!`)
  }
})
  });



})
  .on("error", (err) => {
    console.log("Error: " + err.message);
  });

