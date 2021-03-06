//
vegefruit66.controller('indexController', function($scope,$rootScope){
	$rootScope.currentLink = "index";

	$scope.aryFruitIntro = [
		{'picUri':'http://' + $rootScope.server['ip'] + ':' + $rootScope.server['port'] + '/images/index/orange.png', 'name':"柳丁", "info":"柳丁的維生素C可保護細胞，對抗自由基；果肉所含的膳食纖維，則可以促進消化、改善便祕。另外，所含的果膠能加速食物通過消化道，使脂質、膽固醇更快從糞便排泄出去；含有的檸檬酸，則可以幫助胃液對脂肪物質進行消化，並增進食慾。"},
		{'picUri':'http://' + $rootScope.server['ip'] + ':' + $rootScope.server['port'] + '/images/index/kiwi.png', 'name':"奇異果", "info":"奇異果含有豐富維他命C、膳食纖維，適度食用不但有助美白，還有促進腸胃蠕動、幫助消化的效果，因此獲得「水果之王」的美名。根據研究發現，一天食用2顆奇異果，幾乎可滿足人體1天所需1／3的營養素，達到營養補給的作用。不過，專家表示，即使奇異果富含多種營養素，卻也並非人人都適合食用。"},
		{'picUri':'http://' + $rootScope.server['ip'] + ':' + $rootScope.server['port'] + '/images/index/piapple.png', 'name':"木瓜", "info":"木瓜中含有木瓜酵素能夠幫助消化、吸收蛋白質；維生素C可以防止細胞受到氧化傷害；而維生素K和β胡蘿蔔素，則能有效的對抗衰老的自由基。木瓜性微寒，體質虛弱及脾胃虛寒的人，吃太多會有腹瀉現象。孕後婦女可以食用木瓜牛奶幫助乳汁分泌，但需注意木瓜中含有植物性荷爾蒙，容易對懷孕中婦女體內的荷爾蒙產生干擾，青木瓜對胎兒尤其不利，所以孕婦應盡量少吃。"},
		{'picUri':'http://' + $rootScope.server['ip'] + ':' + $rootScope.server['port'] + '/images/index/apple.png', 'name':"蘋果", "info":"「每頓飯吃一個蘋果，就不用請醫生」，蘋果中含有膳食纖維，可以促進腸胃蠕動，減少便祕與大腸癌的發生，其非水溶水性纖維可降低消化道吸收壞膽固醇，增加膽固醇的清除 率；水溶性膳食纖維可以降低肝臟製造壞的膽固醇，因此蘋果具有保護血液的功能，且可以降底血管疾病的發生；此外，蘋果還富含鉀，可使體內過剩的鈉排出，有益於高血壓患者。"},
		{'picUri':'http://' + $rootScope.server['ip'] + ':' + $rootScope.server['port'] + '/images/index/bnana.png', 'name':"香蕉", "info":"香蕉果肉營養價值頗高，每100克果肉含碳水化合物20克、蛋白質1.2克、脂肪0.6克;此外，還含多種微量元素和維生素。其中維生素A能促進生長，增強對疾病的抵抗力，是維持正常的生殖力和視力所必需;硫胺素能抗腳氣病，促進食欲、助消化，保護神經系統;核黃素能促進人體正常生長和發育。"},
	];
});