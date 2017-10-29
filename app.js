'use strict'

//lib
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var robotapi = require('./route/robotapi');
//end lib

app.use('/static', express.static('html'));
app.use(express.static('html'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/robotapi", robotapi);

//local var function
var szHtmlPath = __dirname + "/html";
//end local

app.get('/', function (req, res) {
	res.sendFile( path.join(szHtmlPath+'/index.html') );
});

app.listen(80, function () {
	console.log('Example app listening on port 80!');
});
