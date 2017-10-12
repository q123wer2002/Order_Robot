'use strict'

//lib
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var robotapi = require('./route/robotapi');
//end lib

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/robotapi", robotapi);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(80, function () {
  console.log('Example app listening on port 80!');
});
