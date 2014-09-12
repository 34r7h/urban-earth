(function() {
  'use strict';
  angular.module('app.controllers', []).controller('AppCtrl', [
    '$scope', '$rootScope', '$firebase', 'api', '$http', 'AWSControl', function($scope, $rootScope, $firebase, api, $http, AWSControl) {
	  $scope.msg = '';

	  console.log(AWSControl);
	  $scope.fromservice = AWSControl.yeah; //no use
	  $scope.myfile = {};
	  $rootScope.$on('AWSUploadSuccess', function(){
		  $scope.msg = 'Upload successful';
	  });
	  $rootScope.$on('AWSUploadError', function(){
		  $scope.msg = 'Upload failed. Please retry';
	  });

      var $window;
      $window = $(window);
      $scope.main = {
        brand: 'Masuk Metal',
        name: 'Bryce Masuk'
      };
		  $scope.test = api.showMe;

      $scope.pageTransitionOpts = [
        {
          name: 'Scale up',
          "class": 'ainmate-scale-up'
        }, {
          name: 'Fade up',
          "class": 'animate-fade-up'
        }, {
          name: 'Slide in from right',
          "class": 'ainmate-slide-in-right'
        }, {
          name: 'Flip Y',
          "class": 'animate-flip-y'
        }
      ];
      $scope.admin = {
        layout: 'wide',
        menu: 'vertical',
        fixedHeader: true,
        fixedSidebar: true,
        pageTransition: $scope.pageTransitionOpts[2]
      };
      $scope.$watch('admin', function(newVal, oldVal) {
        if (newVal.menu === 'horizontal' && oldVal.menu === 'vertical') {
          $rootScope.$broadcast('nav:reset');
          return;
        }
        if (newVal.fixedHeader === false && newVal.fixedSidebar === true) {
          if (oldVal.fixedHeader === false && oldVal.fixedSidebar === false) {
            $scope.admin.fixedHeader = true;
            $scope.admin.fixedSidebar = true;
          }
          if (oldVal.fixedHeader === true && oldVal.fixedSidebar === true) {
            $scope.admin.fixedHeader = false;
            $scope.admin.fixedSidebar = false;
          }
          return;
        }
        if (newVal.fixedSidebar === true) {
          $scope.admin.fixedHeader = true;
        }
        if (newVal.fixedHeader === false) {
          $scope.admin.fixedSidebar = false;
        }
      }, true);
      return $scope.color = {
        primary: '#248AAF',
        success: '#3CBC8D',
        info: '#29B7D3',
        infoAlt: '#666699',
        warning: '#FAC552',
        danger: '#E9422E'
      };
    }
  ]).controller('HeaderCtrl', ['$scope', function($scope) {}]).controller('NavContainerCtrl', ['$scope', function($scope) {}]).controller('NavCtrl', [
    '$scope', function($scope) {

    }
  ]).controller('DashboardCtrl', ['$scope', function($scope) {

  }]);

}).call(this);

//# sourceMappingURL=main.js.map
