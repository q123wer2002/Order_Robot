'use strict'

//for api
var express = require('express');
var app = express();

//aws api
var AWS = require("aws-sdk");
var iamapi = require('./../module/iamapi');
var dynamodbapi = require('./../module/dynamodb');

//update config
var config = iamapi.fnGetConfig();
AWS.config.update(config);

//local
const uuidV1 = require('uuid/v1');
const szTableName = "Robot_Conversation";

//timer
//var nExpireTime = (0*60 + 30)*1000; //not excess 5 mins
var fnUpdateAWSAccess = ()=>{
	iamapi.fnGetNewKey(new AWS.IAM(), function(err, objParam){
		if(err) console.error(err);

		console.log(objParam);
	});
}
//var interval_getKey = setInterval(fnUpdateAWSAccess, nExpireTime);
fnUpdateAWSAccess();

//for db api
app.route('/db/table')
	.post(function(req,res,next){
		
		//start creating
		dynamodbapi.fnCreateDefaultTable(new AWS.DynamoDB(), function(err,data){
			if(err) console.error( "Error : " + err );

			res.json(data);
		});
	});	
app.route('/db/data')
	.post(function(req,res,next){
		var objMessage = req.body;

		var objData = {
			TableName : szTableName,
			Item : {
				"uuid" : uuidV1(),
				"sender" : objMessage.sender,
				"receiver" : objMessage.receiver,
				"content" : objMessage.content,
				"timestamp" : objMessage.timestamp
			}
		};
		
		dynamodbapi.fnPostData2DB(new AWS.DynamoDB.DocumentClient(), objData, function(err,data){
			if(err) {
				console.error( "Error : " + err );
				res.json(err);
			}

			res.json(data);
		});
	})
	.get(function(){});

module.exports = app;