const twit = require ('twit');
const config = require ('./config');
const T = new twit (config);
const https = require ('https');
const path = require('path');
const fs = require('fs');
const request = require('request');
const csvparse = require('csv-parse');
const rita = require('rita');

let inputText = '';
let sentence = '';

const filePath = path.join(__dirname, './twitter-archive/tweets.csv');
const tweetData = function () {
  fs.createReadStream(filePath)
    .pipe(csvparse({
      delimiter: ','
    }))
    .on('data', row => {
      inputText = `${inputText} ${cleanText(row[5])}`
    })
    .on('end', () => {
      const markov = new rita.RiMarkov(7)
      markov.loadText(inputText)
      sentence = markov.generateSentences(1)
        .toString()
        .substring(0, 140)
      markovTweets(sentence);
    })
};


let cleanText = function (text) {
  return rita.RiTa.tokenize(text, ' ')
    .filter(hasNoStopWords)
    .join(' ')
    .trim()
};

let hasNoStopWords = function (token) {
  const stopwords = ['@', 'http', 'RT','PJ'];
  return stopwords.every(sw => !token.includes(sw))
}

let markovTweets = function (sentence) {
  console.log(sentence, 'sentence');
  T.post('statuses/update', {
    status: sentence
  }, (err, data, response) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Markov status tweeted!', sentence)
    }
  })
};

tweetData();
setInterval(tweetData, 14400000);

