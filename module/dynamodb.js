'use strict'

//for aws db
var AWS = require("aws-sdk");
AWS.config.update({
	accessKeyId: 'AKIAIMQ5BVND72V6KODQ',
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
objDbApi.fnCreateDefaultTable = function(fnRespose, objTableParam){
	if( objTableParam == undefined ){
		objTableParam = objTableParams;
	}

	//start action
	dynamodb.createTable(objTableParam, function(err, data) {
		if(err) fnRespose(err);

		fnRespose(null, data);
	});
};

//post data
objDbApi.fnPostData2DB = function(objData,fnRespose){
	docClient.put(objData,function(err,data){
		if(err) fnRespose(err);

		fnRespose(null,{'ErrorCode':'success'});
	});
}

module.exports = objDbApi;