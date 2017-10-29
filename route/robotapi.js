'use strict'

var express = require('express');
var app = express();
var request = require('sync-request');

const objRobotApi = {
	host : "localhost",
	port : 5000
};

app.route('/talk')
	.get(function(req,res,next){
		var szQuestion = req.query.question;

		var objResponse = request('GET', 'http://' + objRobotApi['host'] + ':' + objRobotApi['port'] + '/getResponse/' + szQuestion);

		var buf = new Buffer(objResponse.body);
		objResponse.body = buf.toString();

		res.json(objResponse);
		res.end();
	});


module.exports = app;