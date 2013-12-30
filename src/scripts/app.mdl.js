angular.module('notepad', [
			'ui.router',
			"chromeApps"

        ])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
          .state('main', {
            templateUrl: 'scripts/core/main/main.tpl.html',
            controller: 'mainCtrl'
          })
  }])

.run(["$state", function($state){
		$state.go("main");
	}]);
