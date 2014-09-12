angular.module('app.services', ['firebase'])
	.factory('api', ['$firebase',
		function($firebase) {

			var api = {sync:{index:{}},index:{}};

			var types = ['media','clients','services','articles', 'about'];
			var baseURL = 'https://metal.firebaseio.com/';
			var indexURL = 'https://metal.firebaseio.com/index/';
			angular.forEach(types, function(type){
				api[type] = new Firebase(baseURL+type);
				api.sync[type] = $firebase(api[type]);
				api.index[type] = new Firebase(indexURL+type);
				api.sync.index[type] = $firebase(api.index[type]);
			});
// Media
			api.saveMedia = function(id, title){
				console.log(id + title);
				var link = title.toLowerCase().replace(/'+/g, '').replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "-").replace(/^-+|-+$/g, '');
				api.sync.media.$update(id, {mediaTitle:title, mediaLink:link}).then(function(media){
					console.log(api.sync.index.media[link]);
					api.newID = media.name();
					if(api.sync.index.media[link] === false){
						api.sync.index.media.$set(link, api.newID);
					} else {
						console.log('Try again');

					}


				})
			};
			api.removeMedia = function(name,id){
				console.log(name + id);
				api.sync.media.$remove(id).then(function(){
					api.sync.index.media.$remove(name);
				});

			};
// Clients
			api.saveClient = function(title, features, description){
				var clientURL = title.toLowerCase().replace(/'+/g, '').replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "-").replace(/^-+|-+$/g, '');
				api.sync.clients.$push({title:title,features:features,description:description,clientURL:clientURL}).then(function (client){
					api.newID = client.name();
					api.sync.index.clients.$set(clientURL, api.newID);
				});
			};
			api.removeClient = function(name,id){
				console.log(name + id);
				api.sync.clients.$remove(id).then(function(){
					api.sync.index.clients.$remove(name);
				});

			};
// Services
			api.saveService = function(title, features, description){
				var serviceURL = title.toLowerCase().replace(/'+/g, '').replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "-").replace(/^-+|-+$/g, '');
				api.sync.services.$push({title:title,features:features,description:description,serviceURL:serviceURL}).then(function (service){
					api.newID = service.name();
					api.sync.index.services.$set(serviceURL, api.newID);
				});
			};
			api.removeService = function(name,id){
				console.log(name + id);
				api.sync.services.$remove(id).then(function(){
					api.sync.index.services.$remove(name);
				});

			};
// About
			api.updateAbout = function(id, text){
				api.sync.about.$update(id, {description:text});
				api.aboutSaved = 'About Saved!'
			};
// Articles
			api.saveArticle = function(title, tags, body){
				var articleURL = title.toLowerCase().replace(/'+/g, '').replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "-").replace(/^-+|-+$/g, '');
				console.log(articleURL);
				api.sync.articles.$push({title:title,tags:tags,body:body,articleURL:articleURL}).then(function (article){
					api.newID = article.name();
					api.sync.index.articles.$set(articleURL, api.newID);
				});
			};
			api.removeArticle = function(name,id){
				console.log(name + id);
				api.sync.articles.$remove(id).then(function(){
					api.sync.index.articles.$remove(name);
				});

			};



		console.log(api.sync);

			return api;

	}]);