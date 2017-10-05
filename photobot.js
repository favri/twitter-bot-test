const twit = require ('twit');
const config = require ('./config');
const T = new twit (config);
const https = require ('https');
const path = require('path');
const fs = require('fs');
const request = require('request')

let imgsObj = [];
let postImgObj = {};
let position = Math.floor(Math.random() * 10) + 1;

let tweetRandomImage = function () {
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
      saveFile(postImgObj, 'unsplash.jpg');
    });

  })
    // .on("error", (err) => {
    //   console.log("Error: " + err.message);
    // });
};

let saveFile = function (postImgObj, fileName) {
  const file = fs.createWriteStream(fileName);
  request(postImgObj.urls.regular).pipe(file).on('close', err => {
    if (err) {
      console.log(err);
    } else {
      console.log('Media saved!');
      const descriptionText = 'Foto de: ' + postImgObj.user.name + ' @' + postImgObj.user.twitter_username + ' ' + postImgObj.urls.regular +' vía @unsplash';
      uploadMedia(descriptionText, fileName)
    }
  })
};

let uploadMedia = function (descriptionText, fileName) {
  console.log(`uploadMedia: file PATH ${fileName}`);
  T.postMediaChunked({
    file_path: fileName
  }, (err, data, response) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Data ok');
      const params = {
        status: descriptionText,
        media_ids: data.media_id_string
      };
      postStatus(params)
    }
  })
};

let postStatus = function (params) {
  T.post('statuses/update', params, (err, data, respone) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Status posted photo!')
    }
  })
};

tweetRandomImage();
setInterval(tweetRandomImage, 86400000);

