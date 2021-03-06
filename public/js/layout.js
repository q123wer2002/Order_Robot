var vegefruit66 = angular.module('vegefruit66', []);

//controller
vegefruit66.controller('mainController', function($scope, $rootScope,$http){
	//server location
		$rootScope.server = {
			ip : "10.96.22.182",
			port : 8000
		};
	//header
		$rootScope.header = {
			title : "蔬果溜溜",
			metas : [
				{name : "charset",content : "UTF-8"},
				{name : "description",content : "vegefruit66, 蔬果溜溜"},
				{name : "keywords",content : "vegefruit66, 蔬果溜溜"},
				{name : "viewport",content : "width=device-width, initial-scale=1, maximum-scale=1"}
			],
		};

		$rootScope.includePages = {
			top : "http://" + $rootScope.server["ip"] + ":" + $rootScope.server["port"] + "/templates/top",
			body : "", //depends on page
			footer : "http://" + $rootScope.server["ip"] + ":" + $rootScope.server["port"] + "/templates/footer",
		};

		$rootScope.fnShowMenu = function(){
			$('.lstMenu').animate({left : "0%"}, 500);
			$('.bgBlack').css({display : "block"});
		}
		$rootScope.fnHideMenu = function(){
			$('.lstMenu').animate({left : "-65%"}, 500);
			$('.bgBlack').css({display : "none"});
		}
	//get api url
		var szApiServer = "http://" + $rootScope.server["ip"] + ":" + $rootScope.server["port"];
		var objApiList = {
			"USERIP" : "http://freegeoip.net/json/",
			"ROBOT" : szApiServer + "/robotapi/talk?question=",
			"DB" : szApiServer + "/awsapi/db/data",
			"SPEAK" : szApiServer + "/googleapi/tts?query=",
		};
		$rootScope.fnGetApiUrl = function( szApiType, szMessage ){
			if( szMessage == undefined || szMessage.length == 0 ){
				return objApiList[ szApiType.toUpperCase() ];
			}

			return objApiList[ szApiType.toUpperCase() ] + szMessage;
		}
	//menu list
		$rootScope.objMenuList = {
			index : {name:"首頁", link:"index", isSelected:false, isShown:true},
			//farmerTalk : {name:"農民都說讚", link:"farmerTalk.html", isSelected:false, isShown:false},
			//friendShop : {name:"合作商家", link:"friendShop.html", isSelected:false, isShown:false},
			//masterVegeFood : {name:"蔬果大廚在這", link:"masterVegeFood.html", isSelected:false, isShown:false},
			//shipments : {name:"蔬果出貨區", link:"shipments.html", isSelected:false, isShown:true},
			//activity : {name:"一起探訪去", link:"activity.html", isSelected:false, isShown:true},
			//shopping : {name:"購物去吧！", link:"shopping.html", isSelected:false, isShown:true}
			order : {name:"線上點餐", link:"order", isSelected:false, isShown:true, style:{} },
			robotapi : {name:"蔬果機器人beta", link:"vegebot", isSelected:false, isShown:true, style:{} },
		};

		$rootScope.StyleTargetMenu = function(objMenu){
			objMenu.isSelected = false;
			if( $rootScope.currentLink == objMenu.link ){
				objMenu.isSelected = true;
			}
		}
	//ajax
		$rootScope.fnAjax = function( szMethod, szUrl, objParam, fnResponse, isDebugMode=false ){
			if( fnResponse == undefined ){
				fnResponse = objParam;
			}

			var objNormalParam = {
				method: szMethod,
				url: szUrl,
			};

			var objPOSTParam = {
				header : { 'Content-Type':'application/json' },
				data : objParam
			};

			var objConnectParam = ( szMethod.toUpperCase() == "GET" ) ? objNormalParam : angular.extend({}, objNormalParam, objPOSTParam);
			//console.log(objConnectParam);
			$http( objConnectParam ).then(function successCallback(response) {
				if( isDebugMode == true ){
					console.log(response);
					console.log(status);
				}

				fnResponse( false, response );
			}, function errorCallback(response) {
				//do nothing
				fnResponse(response);
			});
		}
});

//directive
vegefruit66.directive("scroll", function($window){
	return function(scope, element, attrs) {
		angular.element($window).bind("scroll", function() {
			if (this.pageYOffset >= 140) {
				scope.isChangeClass = true;
			}else{
				scope.isChangeClass = false;
			}
			scope.$apply();
		});
	};
});

vegefruit66.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
});