angular.module('app.services', ['firebase'])
	.factory('api', ['$firebase',
		function($firebase) {
			var api = {};
			api.ref = {};
			api.sync = {};

			api.saveMedia = function(id, title){
				api.media = new Firebase("https://metal.firebaseio.com/media");
				api.sync.media = $firebase(api.media);
				console.log(id + title);
				var link = title.toLowerCase().replace(/'+/g, '').replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "-").replace(/^-+|-+$/g, '');
				api.sync.media.$update(id, {mediaTitle:title, mediaLink:link})
			};

			api.saveClient = function(title, features, description){
				var clientURL = title.toLowerCase().replace(/'+/g, '').replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "-").replace(/^-+|-+$/g, '');
				console.log(clientURL);
				api.client = new Firebase("https://metal.firebaseio.com/clients");
				api.sync.client = $firebase(api.client);
				api.sync.client.$push({title:title,features:features,description:description,clientURL:clientURL}).then(function (client){
					// console.log(client.name());
					api.newID = client.name();
					console.log(api.newID);

					api.index = new Firebase("https://metal.firebaseio.com/index/clients");
					api.sync.index = $firebase(api.index);
					// title = title.toLowerCase().replace(/'+/g, '').replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "-").replace(/^-+|-+$/g, '');
					api.sync.index.$set(clientURL, api.newID);
				});
			};

			api.saveService = function(title, features, description){
				var serviceURL = title.toLowerCase().replace(/'+/g, '').replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "-").replace(/^-+|-+$/g, '');
				console.log(serviceURL);
				api.service = new Firebase("https://metal.firebaseio.com/services");
				api.sync.service = $firebase(api.service);
				api.sync.service.$push({title:title,features:features,description:description,serviceURL:serviceURL}).then(function (service){
					// console.log(service.name());
					api.newID = service.name();
					console.log(api.newID);

					api.index = new Firebase("https://metal.firebaseio.com/index/services");
					api.sync.index = $firebase(api.index);
					// title = title.toLowerCase().replace(/'+/g, '').replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "-").replace(/^-+|-+$/g, '');
					api.sync.index.$set(serviceURL, api.newID);
				});
			};
			api.saveArticle = function(title, tags, body){
				var articleURL = title.toLowerCase().replace(/'+/g, '').replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "-").replace(/^-+|-+$/g, '');
				console.log(articleURL);
				api.article = new Firebase("https://metal.firebaseio.com/articles");
				api.sync.article = $firebase(api.article);
				api.sync.article.$push({title:title,tags:tags,body:body,articleURL:articleURL}).then(function (article){
					// console.log(article.name());
					api.newID = article.name();
					console.log(api.newID);

					api.index = new Firebase("https://metal.firebaseio.com/index/articles");
					api.sync.index = $firebase(api.index);
					// title = title.toLowerCase().replace(/'+/g, '').replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "-").replace(/^-+|-+$/g, '');
					api.sync.index.$set(articleURL, api.newID);
				});
			};


		console.log(api.ref);

		console.log(api.sync);

			return api;

	}]);