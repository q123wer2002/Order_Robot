'use strict'

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
objDbApi.fnCreateDefaultTable = function(dynamodb, fnRespose, objTableParam){
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
objDbApi.fnPostData2DB = function(docClient, objData,fnRespose){
	docClient.put(objData,function(err,data){
		if(err) fnRespose(err);

		fnRespose(null,{'ErrorCode':'success'});
	});
}

module.exports = objDbApi;