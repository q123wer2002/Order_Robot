'use strict'

//for api
var express = require('express');
var app = express();

//aws api
var dynamodbapi = require('./../module/dynamodb');
var iamapi = require('./../module/iamapi');

//local
const uuidV1 = require('uuid/v1');
const szTableName = "Robot_Conversation";

//for db api
app.route('/db/table')
	.post(function(req,res,next){
		
		//start creating
		dynamodbapi.fnCreateDefaultTable(function(err,data){
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
		
		try{
			dynamodbapi.fnPostData2DB(objData, function(err,data){
				if(err) {
					console.error( "Error : " + err );
					res.json(err);
				}

				res.json(data);
			});
		}catch(ex){

		}
	})
	.get(function(){});


module.exports = app;