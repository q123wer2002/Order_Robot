'use strict'

//lib
var express = require('express');
var app = express();
var cors = require('cors')
var bodyParser = require('body-parser');
var robotapi = require('./route/robotapi');
var path = require('path');
const nPort = 80;
//end lib

app.use(cors());
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

app.listen(nPort, function () {
	console.log('Example app listening on port ' + nPort + '!');
});
