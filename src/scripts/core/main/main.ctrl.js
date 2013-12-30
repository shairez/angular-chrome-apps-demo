angular.module('notepad')
	.controller('mainCtrl',
				['$scope',
				 "chromeApps.services.facades.syncFileSystemFacade",
				 "chromeApps.services.facades.fileSystemFacade",
				 "chromeApps.services.adapters.chrome.textToSpeechAdapter",
		function ($scope,
		          syncFileSystemFacade,
		          fileSystemFacade,
		          textToSpeechAdapter) {

			var noteFileName = "notepadFile.txt";
			$scope.text = "";
			$scope.jarvisMode = false;
			$scope.jarvisModeOff = "";
			$scope.syncMessage = "";


			$scope.loadFile= function(){
				fileSystemFacade.loadingTextFile().then(
					function success(fileContent){
						$scope.text = fileContent;
				})
			}

			$scope.loadText = function(){
				syncFileSystemFacade.gettingTextFromFile(noteFileName)
					.then(function success(text){
						$scope.text = text;
						$scope.syncMessage = "File Loaded";
					});
			}

			$scope.saveToDrive = function(){
				syncFileSystemFacade.savingTextToFile(noteFileName, $scope.text)
					.then(function(){
						$scope.syncMessage = "File Saved";
					});

			}

			$scope.bePolite = function(){
				textToSpeechAdapter.speak($scope.text);
			}

			$scope.toggleJarvis = function(){
				$scope.syncMessage = "";
				$scope.jarvisMode = !$scope.jarvisMode;
				jarvisModeOff = $scope.jarvisMode ? "" : "off";
			}

			$scope.$watch("jarvisText", function(newVal){
				if (!newVal) return;
				switch (newVal.toLowerCase()){
					case "load my pictures":
					case "load my picture":
						$scope.loadMyPic = true;
					break;
					case "make me pretty":
						$scope.makeMePretty = true;
						$scope.loadMyPic = false;
					break;

					case "build a website":
						$scope.makeMePretty = false;
						$scope.loadMyPic = false;

						$scope.toggleJarvis();
						$scope.text = "<html><body></body></html>"
					break;

				}
			})


	}]);
