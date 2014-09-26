(function() {
  'use strict';
  angular.module('app.controllers', []).controller('AppCtrl', [
    '$scope', '$rootScope', '$firebase', 'api', '$http', 'AWSControl', function($scope, $rootScope, $firebase, api, $http, AWSControl) {
		  $scope.preventClose = function(event) { event.stopPropagation(); };
$scope.api = api;
		  $scope.msg = '';

	  console.log(AWSControl);
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
        brand: 'Urban Earth Teas',
        name: 'Mara Jade'
      };

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
        menu: 'horizontal',
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
        primary: 'rgba(245, 28, 45, 1)',
        success: '#3CBC8D',
        info: '#028174',
        infoAlt: '#666699',
        warning: '#FAC552',
        danger: '#cb0211'
      };
    }
  ]).controller('HeaderCtrl', ['$scope', function($scope) {}]).controller('NavContainerCtrl', ['$scope', function($scope) {}]).controller('NavCtrl', [
    '$scope', function($scope) {

    }
  ]).controller('DashboardCtrl', ['$scope', function($scope) {

  }]);

}).call(this);

//# sourceMappingURL=main.js.map
