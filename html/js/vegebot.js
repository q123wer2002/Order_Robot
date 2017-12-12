//
vegefruit66.controller('vegebotController', function($scope,$rootScope,$interval){
	$rootScope.currentLink = "vegebot.html";
	
	$scope.szUserIP;
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

			//init
			if( isInitDone == false ){
				fnGetUserIP();
				isInitDone = true;
			}
		}
	};

	var isInitDone = false;
	var szIP = "";
	var fnGetUserIP = function(fnResponse){
		var szTestIpUrl = $rootScope.fnGetApiUrl( "USERIP" );
		$rootScope.fnAjax( "GET", szTestIpUrl, function(objError, objData){
			if(objError) console.log(objError);

			$scope.szUserIP = objData.data.ip
		});
	}

	//send message into conversation
	var fnSendMsg2Conversion = function( isRobot, szMessage, aryConversion, isError ){
		var date = new Date();
		var szUserName = ( isRobot == true ) ? "蔬果機器人" : "你";
		var objMsg = { "sender":szUserName, "content":szMessage, "timestamp":date.toLocaleString(), "isRobot":isRobot, "isError":isError };

		//send into array conversation
		aryConversion.push( objMsg );
		
		//speak
		if( isRobot == true ){
			fnSpeakAudio(objMsg.content);
		}

		//ui, scroll to down
		var nHeight = jQuery('.ConversionArea').prop('scrollHeight') - jQuery('.ConversionArea').position().top;
		jQuery('.ConversionArea').animate({ scrollTop: nHeight }, 150);

		//save into db
		if( isInitDone == false ){
			return;
		}

		var szSender = ( isRobot == true ) ? "蔬果機器人" : $scope.szUserIP;
		var szReceiver = ( isRobot == false ) ? "蔬果機器人" : $scope.szUserIP;
		var objMessage = { "sender":szSender, "receiver":szReceiver, "content":szMessage, "timestamp":date.toLocaleString() };
		fnSaveMsg2DB(objMessage);
	}

	//use robot api
	var fnRobotResponse = function( szMessage, aryConversion ){
		//use api to get response
		var szRobotUrl = $rootScope.fnGetApiUrl( "ROBOT", szMessage );
		var szErrorMessage = "系統錯誤，可按F12查看";

		//call robot api
		$rootScope.fnAjax( "GET", szRobotUrl, function(objError, objData){
			if( objError ){
				console.error(objError);
				fnSendMsg2Conversion(true, szErrorMessage, aryConversion, true);
				return;
			}

			//error occure
			if( objData.status != 200 || objData.data.body.indexOf('bot:') == -1 ){
				console.error(objData);
				fnSendMsg2Conversion(true, szErrorMessage, aryConversion, true);
				return;
			}

			//get response
			var subRobotMsg = objData.data.body.split('bot: ');
			var szRobotMsg = subRobotMsg[1];

			//put into array
			fnSendMsg2Conversion(true, szRobotMsg, aryConversion);
		});
	}

	//save data into db
	var fnSaveMsg2DB = function( objMsg ){
		var szDBApiUrl = $rootScope.fnGetApiUrl( "DB" );
		$rootScope.fnAjax( "POST", szDBApiUrl, objMsg, function(objError, objData){
			if(objError) console.log(objError);

			//console.log(objData);
		});
	}

	//speak
	var fnSpeakAudio = function( szMessage ){
		console.log(szMessage);
		var szSpeakApiUrl = $rootScope.fnGetApiUrl( "SPEAK", szMessage );
		$rootScope.fnAjax( "GET", szSpeakApiUrl, function(objError, objData){
			if(objError) console.log(objError);

			//set google tts url
			//var HTMLGoogletts = document.getElementById("googletts");
			//HTMLGoogletts.src = objData.data;

			//speak
			var AudioPlayer = document.getElementById("AudioPlayer");
			AudioPlayer.src = objData.data;
			AudioPlayer.play();
		});
	}
});