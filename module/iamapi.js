'use strict'

var fs = require('fs');
var config = require('./../config.json');

//api object
var iamApi = {};
iamApi.fnGetConfig = function(){
	return config.aws_config;
}
iamApi.fnGetNewKey = function( iam, fnResponse ){
	var objCreateKey = {
		UserName : config.aws_config.userName
	};

	iam.createAccessKey( objCreateKey, function(err,data){
		if(err){
			fnResponse(err);
			return;
		}

		//new delete object
		var objDeleteKey = {
			UserName : config.aws_config.userName,
			AccessKeyId : config.aws_config.accessKeyId
		};

		//update key
		config.aws_config.accessKeyId = data.AccessKey.AccessKeyId;
		config.aws_config.secretAccessKey = data.AccessKey.SecretAccessKey;
		//AWS.config.update(config.aws_config);

		//write file
		var szJson = JSON.stringify(config);
		fs.writeFile('config.json', szJson, 'utf8', function(err,data){
			if(err){
				fnResponse(err);
				return;
			}
		});

		//delete old key
		iam.deleteAccessKey(objDeleteKey, function(err,data){
			if(err){
				fnResponse(err);
				return;
			}

			fnResponse(null, config.aws_config);
		});
	});
}

module.exports = iamApi;