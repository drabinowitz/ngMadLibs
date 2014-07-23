angular.module('madlibs', ['ngAnimate'])

	.controller('mlInputCtrl', function($rootScope,$scope,$timeout) {

		var init = function(){

			$rootScope.mlTab = "input";

			$scope.settings = {};

			$scope.submitted = false;

			$scope.madlibs={
				
				name:{
					type: "text",
					placeholder:'Name',
					index:1
				},
				
				jobTitle:{
					type: "text",
					placeholder:'Job title',
					index:2
				},
				
				tediousTask:{
					type: "text",					
					placeholder:'Tedious task',
					index:3
				},
				
				dirtyTask:{
					type: "text",					
					placeholder:'Dirty task',
					index:4
				},
				
				celebrity:{
					type: "text",					
					placeholder:'Celebrity',
					index:5
				},
				
				uselessSkill:{
					type: "text",					
					placeholder:'Useless skill',
					index:6
				},

				obnoxiousCelebrity:{
					type: "text",					
					placeholder:'Obnoxious celebrity',
					index:7
				},

				hugeNumber:{
					type: "number",					
					placeholder:'Huge number',
					index:8
				},

				adjective:{
					type: "text",					
					placeholder:'Adjective',
					index:9
				}
			}

		};

		$scope.submit = function(){

			$scope.submitted = true;

			if($scope.mlForm.$valid){

				console.log('Form Submitted: ',$scope.madlibs,$scope.settings);

				$timeout(function(){

					$rootScope.$broadcast('mlSubmit',$scope.madlibs,$scope.settings);

				},500);

				$rootScope.mlTab = undefined;

			} else {

				console.log('form not valid');

			}

		};

		$scope.madlibs = {};

		$rootScope.mlTab = "input";

		$timeout(init,10);

		$scope.$on('mlReset',function(event){

			init();

		})

	})

	.filter('orderObjectBy', function() {
	  
	  return function(items, field, reverse) {
	    var filtered = [];
	    angular.forEach(items, function(item) {
	      filtered.push(item);
	    });
	    filtered.sort(function (a, b) {
	      return (a[field] > b[field] ? 1 : -1);
	    });
	    if(reverse) filtered.reverse();
	    return filtered;
	  };

	})

	.controller('mlOutputCtrl', function($rootScope,$scope,$timeout){

		$scope.$on('mlSubmit',function(event,madlibs,settings){

			$scope.madlibs = madlibs;

			$scope.settings = settings;

			$rootScope.mlTab = "output";

		});

		$scope.reset = function(){

			$timeout(function(){

				$rootScope.$broadcast('mlReset');

			},500);

			$rootScope.mlTab = undefined;

		};

	})

	.filter('gender', function() {
	
	  return function(input,genderInput) {
	
	    var pronouns={obj:['he','she'],subj:['him','her'],poss:['his','her']};
	
	    return genderInput == "male"? pronouns[input][0] : pronouns[input][1];
	
	  };

	});