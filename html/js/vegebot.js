//
vegefruit66.controller('vegebotController', function($scope,$rootScope){
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
			fnSendMsg2Conversion( isRobot, szMessage, $scope.aryConversation );

			//get robot api
			if( isRobot == false ){
				fnRobotResponse( szMessage, $scope.aryConversation );
			}

			//clear szMessage
			this.szMessage = "";

			//ui, scroll to down
			var nHeight = jQuery('.ConversionArea').prop('scrollHeight') - jQuery('.ConversionArea').position().top;
			jQuery('.ConversionArea').animate({ scrollTop: nHeight }, 150);
		}
	};

	//send message into conversation
	var fnSendMsg2Conversion = function( isRobot, szMessage, aryConversion ){
		var date = new Date();
		var szUserName = ( isRobot == true ) ? "蔬果機器人" : "你";
		var objMsg = { "user":szUserName, "content":szMessage, "timestamp":date.toLocaleString(), "isRobot":isRobot };

		//send into array conversation
		aryConversion.push( objMsg );
	}

	//use robot api
	var fnRobotResponse = function( szMessage, aryConversion ){
		//use api to get response
		var szRobotMsg = $rootScope.fnAjax( "GET", "http://18.216.141.151/robotapi/test?talk=" + szMessage );

		//add robot message into conversation
		fnSendMsg2Conversion( true, szRobotMsg, aryConversion );
	}
});