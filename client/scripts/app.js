(function() {
  'use strict';
  angular.module('app', [
	  'ngSanitize',
	  'ngRoute',
	  'ngAnimate',
	  'ui.bootstrap',
	  'ui.router',
	  'easypiechart',
	  'textAngular',
	  'ui.tree',
	  'ngMap',
	  'ngTagsInput',
	  'app.controllers',
	  'app.services',
	  'app.directives',
	  'app.localization',
	  'app.nav',
	  'app.ui.ctrls',
	  'app.ui.directives',
	  'app.ui.services',
	  'app.ui.map',
	  'app.form.validation',
	  'app.ui.form.ctrls',
	  'app.ui.form.directives',
	  'app.tables',
	  'app.task',
	  'app.chart.ctrls',
	  'app.chart.directives',
	  'app.page.ctrls',
	  'akoenig.deckgrid',
      'uploader']).config([
    '$stateProvider', '$urlRouterProvider', 'AWSControlProvider', function($stateProvider, $urlRouterProvider, AWSControlProvider) {

		  var imageSupportParams = {
			  type           : 'image.*',
			  host           : 's3',
			  Bucket         : 'masuk',
			  accessKeyId    : 'AKIAIABNWCTWZ65JJV4A',
			  secretAccessKey: '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',
			  region         : 'us-west-2'

		  };

		  AWSControlProvider.supportType(imageSupportParams);
      var routes, setRoutes, routesSingles, setSingleRoutes;
      routes = ['home','about','services','clients','articles','media','admin', '404'];
      routesSingles = ['services','clients','articles','media'];
      setRoutes = function(route) {
        var state, config;
	    state = route;
        config = {
          url: '/' + route,
          templateUrl: 'views/' + route + '.html',
	        controller: function($scope, $state, api, $firebase){
		        var itemList = new Firebase("https://metal.firebaseio.com/"+route);
		        console.log('itemList = '+ itemList);
		        var sync = $firebase(itemList);
		        $scope.showMe = sync.$asArray();
		        $scope.api = api;
		        $scope.saveArticle = api.saveArticle;
		        $scope.saveService = api.saveService;
		        $scope.saveClient = api.saveClient;
		        $scope.saveMedia = api.saveMedia;
		        $scope.tags = ['foo', 'bar'];
		        $scope.urlFilter = function(url) {
			        return url.toLowerCase().replace(/'+/g, '').replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "-").replace(/^-+|-+$/g, '');
		        };
	        }
        };
        $stateProvider.state(state, config);
        return $stateProvider;
      };
	  setSingleRoutes = function(singleRoute) {
		  var state, config;
		  state = 'single-'+singleRoute;
		  config = {
			  url: '/'+ singleRoute+ '/:' + singleRoute,
			  templateUrl: 'views/single/'+ singleRoute + '.html',
			  data: {
				  singleData: 'I am that data'
			  },
			  controller: function($scope, $state, api, $firebase){
				  $scope.thisData = $state.current.data;
				  $scope.state = $state;
				  $scope.api = api;
				  var ref = new Firebase("https://metal.firebaseio.com/index/"+singleRoute+"/"+$scope.state.params[singleRoute]);
				  ref.on('value', function (snapshot) {
					  var itemID = snapshot.val();
					  var itemRef = new Firebase("https://metal.firebaseio.com/"+singleRoute+"/"+itemID);
					  var sync = $firebase(itemRef);
					  $scope.singleData = sync.$asObject();
				  }, function (errorObject) {
					  console.log('The read failed: ' + errorObject.code);
				  });
			  }
		  };
		  $stateProvider.state(state, config);
		  return $stateProvider;
	  };
      routes.forEach(function(route) {
	      console.log(route);
	      return setRoutes(route);
      });
	  routesSingles.forEach(function(routesSingle) {
		  console.log(routesSingle);
		  return setSingleRoutes(routesSingle);
	  });
	  return $urlRouterProvider.otherwise('/home');

    }
  ]);

}).call(this);

//# sourceMappingURL=app.js.map
