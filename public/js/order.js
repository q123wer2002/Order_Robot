//
vegefruit66.controller('orderController', function($scope,$rootScope){
	$rootScope.currentLink = "order";

	//public var
	$scope.aryDrinkProducts = [
		{"name":"芭樂柳橙汁", "number":0, "picUri":"https://dbjdsnch130xu.cloudfront.net/uploads/recipe/cover/172367/large_67c415c21f5d7c78.jpg" },
		{"name":"柳橙汁", "number":0, "picUri":"https://foodtracer.taipei.gov.tw/Front/ReadFile/?p=product&id=84478864&n=84478864_45.png" },
		{"name":"芭樂汁", "number":0, "picUri":"http://www.carrefour.com.tw/sites/default/files/public/styles/cuwt_core_recipe_tip_full_node_image_zoom/public/_00_6513_0.jpg" }
	];
	$scope.fnModifyCount = function( objDrink, szMethod ){
		//modify drink number
		switch( szMethod.toUpperCase() ){
			case "PLUS":
				objDrink.number ++;
				break;
			case "MINUS":
				if( objDrink.number == 0 ){
					return;
				}

				objDrink.number --;
				break;
		}

		//
		for( var i=0; i<$scope.aryDrinkProducts.length; i++ ){
			if( $scope.aryDrinkProducts[i].number > 0 ){
				$scope.isReadyGoPay = true;
				return;
			}
		}

		$scope.isReadyGoPay = false;
	}

	//public var
	$scope.isReadyGoPay = false;
});