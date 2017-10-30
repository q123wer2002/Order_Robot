//
vegefruit66.controller('vegebotController', function($scope,$rootScope,$interval){
	$rootScope.currentLink = "vegebot.html";
	
	$scope.aryConversation = [];
	$scope.objMessage = {
		szMessage : "您好，可以透過打字與我溝通 :)",
		fnSendMsg : function( isRobot ){
			//no message typing
			if( this.szMessage.length == 0 ){
				return;
			}

			//create message object
			var szMessage = this.szMessage;

			//clear szMessage
			this.szMessage = "";

			//send message
			fnSendMsg2Conversion( isRobot, szMessage, $scope.aryConversation );

			//get robot api
			if( isRobot == false ){
				fnRobotResponse( szMessage, $scope.aryConversation );
			}
		}
	};

	//send message into conversation
	var fnSendMsg2Conversion = function( isRobot, szMessage, aryConversion ){
		var date = new Date();
		var szUserName = ( isRobot == true ) ? "蔬果機器人" : "你";
		var objMsg = { "user":szUserName, "content":szMessage, "timestamp":date.toLocaleString(), "isRobot":isRobot };

		//send into array conversation
		aryConversion.push( objMsg );

		//ui, scroll to down
		var nHeight = jQuery('.ConversionArea').prop('scrollHeight') - jQuery('.ConversionArea').position().top;
		jQuery('.ConversionArea').animate({ scrollTop: nHeight }, 150);
	}

	//use robot api
	var fnRobotResponse = function( szMessage, aryConversion ){
		//use api to get response
		var szUrl = "http://18.216.141.151/robotapi/talk?question=" + szMessage;

		//call robot api
		$rootScope.fnAjax( "GET", szUrl, function(objError, objData){
			//get response
			if( objError ){ console.log(objError); }

			//do action
			if( objData.status != 200 || objData.data.body.indexOf('bot:') == -1 ){
				//error occure
			}

			console.log(objData);
			var subRobotMsg = objData.data.body.split('bot: ');
			var szRobotMsg = subRobotMsg[1];

			//put into array
			fnSendMsg2Conversion(true, szRobotMsg, aryConversion);
		});
	}
});