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

			//create message
			var date = new Date();
			var szUserName = ( isRobot == true ) ? "蔬果機器人" : "你";
			var objConver = { "user":szUserName, "content":this.szMessage, "timestamp":date.toLocaleString(), "isRobot":isRobot };

			//send into array conversation
			$scope.aryConversation.push( objConver );

			//clear szMessage
			this.szMessage = "";

			//ui, scroll to down
			var nHeight = jQuery('.ConversionArea').prop('scrollHeight') - jQuery('.ConversionArea').position().top;
			jQuery('.ConversionArea').animate({ scrollTop: nHeight }, 150);
		}
	};
});