angular.module('madlibs', [])

	.controller('mlInputCtrl', function($rootScope,$scope) {

		$rootScope.mlTab = "input";

		$scope.submit = function(){

			$scope.submitted = true;

			if($scope.mlForm.$valid){

				console.log('Form Submitted: ',$scope.madlibs);

				$rootScope.$broadcast('mlSubmit',$scope.madlibs);

			} else {

				console.log('form not valid');

			}

		};
	
		$scope.madlibs={
			
			name:{
				placeholder:'Name',
				index:1
			},
			
			jobTitle:{
				placeholder:'Job title',
				index:2
			},
			
			tediousTask:{
				placeholder:'Tedious task',
				index:3
			},
			
			dirtyTask:{
				placeholder:'Dirty task',
				index:4
			},
			
			celebrity:{
				placeholder:'Celebrity',
				index:5
			},
			
			uselessSkill:{
				placeholder:'Useless skill',
				index:6
			},

			obnoxiousCelebrity:{
				placeholder:'Obnoxious celebrity',
				index:7
			},

			hugeNumber:{
				placeholder:'Huge number',
				index:8
			},

			adjective:{
				placeholder:'Adjective',
				index:9
			}
		}

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

	.controller('mlOutputCtrl', function($rootScope,$scope){

		$scope.$on('mlSubmit',function(event,madlibs){

			$scope.madlibs = madlibs;

			$rootScope.mlTab = "output";

		});

	})

	.filter('gender', function() {
	
	  return function(input,genderInput) {
	
	    var pronouns={obj:['he','she'],subj:['him','her'],poss:['his','her']};
	
	    return genderInput == "male"? pronouns[input][0] : pronouns[input][1];
	
	  };
	
	});