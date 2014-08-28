angular.module('app.services', ['firebase'])
	.factory('api', ['$firebase',
		function($firebase) {
			var api = {};
		api.dbTables = ['about','services','clients','articles','media','contact'];
		api.ref = {};
		api.sync = {};
		angular.forEach(api.dbTables, function(table){
			api.ref[table] = new Firebase("https://metal.firebaseio.com/"+table);
			api.sync[table] = $firebase(api.ref[table]);
			api.showMe = api.sync[table].$asArray();
			console.log(api.sync[table]);
			api.sync[table].$push({name:'',imgUrl:'',description:''});
		});
			api.test = api.showMe;
		console.log(api.ref);
		console.log(api.sync);
			return api;

	}]);