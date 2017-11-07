'use strict'

//for aws db
var AWS = require("aws-sdk");
AWS.config.update({
	accessKeyId: 'AKIAJ6OPPSJFBMQA45LA',
	secretAccessKey: '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',
	region: "us-east-2"
});

var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

var objTableParams = {
	TableName : "Robot_Conversation",
	KeySchema: [
		{ AttributeName: "uuid", KeyType: "HASH"}, //Partition key
	],
	AttributeDefinitions: [
		{ AttributeName: "uuid", AttributeType: "S" },
	],
	ProvisionedThroughput: {
		ReadCapacityUnits: 10,
		WriteCapacityUnits: 10
	}
};

//new object to return public api
var objDbApi = {};

//get table schema
objDbApi.fnCreateDefaultTable = function(fnRespose=function(err,data){console.log(err);}, objTableParam=objTableParams){
	//start action
	dynamodb.createTable(objTableParam, function(err, data) {
		if(err) fnRespose(err);

		fnRespose(null, data);
	});
};

//post data
objDbApi.fnPostData2DB = function(objData,fnRespose=function(err,data){console.log(err);}){
	docClient.put(objData,function(err,data){
		if(err) fnRespose(err);

		fnRespose(null,{'ErrorCode':'success'});
	});
}

module.exports = objDbApi;