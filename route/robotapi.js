'use strict'

var express = require('express');
var app = express();
var request = require('sync-request');

app.route('/test')
	.get(function(req,res,next){
		var szQuestion = req.query.talk;

		var objResponse = request('GET', 'http://localhost:5000/getResponse/' + szQuestion);
		res.json(objResponse);
		res.end();
	});


module.exports = app;