'use strict'

var fs = require('fs');
var config = require('./../config.json');

//aws config
var AWS = require("aws-sdk");
AWS.config.update(config.aws_config);

//iam object
var iam = new AWS.IAM();

//api object
var iamApi = {};
iamApi.fnGetNewKey = function(){
	var objCreateKey = {
		UserName : config.aws_config.userName
	};

	iam.createAccessKey( objCreateKey, function(err,data){
		if(err){
			console.log(err, err.stack);
			return;
		}

		console.log( "got new key, update key :" + data.AccessKey.AccessKeyId );

		//new delete object
		var objDeleteKey = {
			UserName : config.aws_config.userName,
			AccessKeyId : config.aws_config.accessKeyId
		};

		//update key
		config.aws_config.accessKeyId = data.AccessKey.AccessKeyId;
		config.aws_config.secretAccessKey = data.AccessKey.SecretAccessKey;
		AWS.config.update(config.aws_config);

		//write file
		var szJson = JSON.stringify(config);
		fs.writeFile('config.json', szJson, 'utf8', function(err,data){
			if(err){
				console.log(err, err.stack);
				return;
			}
		});

		//delete old key
		iam.deleteAccessKey(objDeleteKey, function(err,data){
			if(err){
				console.log(err, err.stack);
				return;
			}
		});
	});
}

//interval to get new access key
var nExpireTime = (4*60 + 30)*1000; //not excess 5 mins
var interval_getKey = setInterval(iamApi.fnGetNewKey, nExpireTime);

module.exports = iamApi;