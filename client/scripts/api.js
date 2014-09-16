angular.module('app.services', ['firebase'])
	.factory('api', ['$firebase',
		function($firebase) {

			var api = {show:{},sync:{index:{}},index:{}};

			var types = ['media','clients','services','articles', 'about'];
			var baseURL = 'https://metal.firebaseio.com/';
			var indexURL = 'https://metal.firebaseio.com/index/';
			angular.forEach(types, function(type){
				api[type] = new Firebase(baseURL+type);
				api.sync[type] = $firebase(api[type]);
				api.index[type] = new Firebase(indexURL+type);
				api.sync.index[type] = $firebase(api.index[type]);
				// makes display object
				api.show[type] = api.sync[type].$asArray();
			});
// Media
			api.saveMedia = function(id, title){
				console.log(id + title);
				var link = title.toLowerCase().replace(/'+/g, '').replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "-").replace(/^-+|-+$/g, '');
				api.sync.media.$update(id, {mediaTitle:title, mediaLink:link}).then(function(media){
					api.newID = media.name();
					if(api.sync.index.media[link] === false){
						api.sync.index.media.$set(link, api.newID);
					} else {
						console.log('Try again');
						// prompt('Give this a title that\'s not taken yet');
						// this();
					}
				})
			};
			api.removeMedia = function(name,id){
				console.log(name + id);
				api.sync.media.$remove(id).then(function(){
					api.sync.index.media.$remove(name);
				});

			};
			api.addContentMedia = function(content, id, media){
				console.log('Begin add media');
				console.log(content);
				console.log(id);
				console.log(media);
				media.push(id);
			};
			api.removeContentMedia = function(media, id){
				console.log('so called media...'+media +' supposed id:'+ id);
				for(var i=0; i< media.length; i++){
					console.log(media[i]);
					if(media[i] === id){
						media.splice(i, 1);  //removes 1 element at position i
						break;
					}
				}
				console.log('so called new media: '+ media);
			};
// Clients
			api.saveClient = function(title, description, media){
				if(!media){
					media = '';
				}
				this.media = media;
				console.log('media = '+this.media);
				var clientURL = title.toLowerCase().replace(/'+/g, '').replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "-").replace(/^-+|-+$/g, '');
				api.sync.clients.$push({title:title,media:media,description:description,clientURL:clientURL}).then(function (client){
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
			api.updateClientTitle = function(id, title){
				var link = title.toLowerCase().replace(/'+/g, '').replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "-").replace(/^-+|-+$/g, '');
				api.sync.clients.$update(id, {title:title, clientURL:link}).then(function(client){
					api.newID = client.name();
					api.sync.index.clients.$set(link, api.newID);
				})
			};
			api.updateClient = function(id, description, media){
				console.log(id +' '+ description +' '+ media);
				api.sync.clients.$update(id, {description:description, media:media});
			};
// Services
			api.saveService = function(title, description, media){
				var serviceURL = title.toLowerCase().replace(/'+/g, '').replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "-").replace(/^-+|-+$/g, '');
				api.sync.services.$push({title:title,description:description,serviceURL:serviceURL, media:media}).then(function (service){
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
			api.updateServiceTitle = function(id, title){
				var link = title.toLowerCase().replace(/'+/g, '').replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "-").replace(/^-+|-+$/g, '');
				api.sync.services.$update(id, {title:title, serviceURL:link}).then(function(service){
					api.newID = service.name();
					api.sync.index.services.$set(link, api.newID);
				})
			};
			api.updateService = function(id, description, media){
				api.sync.services.$update(id, {description:description, media:media});
			};
// About
			api.updateAbout = function(id, text){
				api.sync.about.$update(id, {description:text});
				api.aboutSaved = 'About Saved!'
			};
// Articles
			api.saveArticle = function(title, body, media){
				if(!media){
					var media = media;
				}
				var articleURL = title.toLowerCase().replace(/'+/g, '').replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "-").replace(/^-+|-+$/g, '');
				api.sync.articles.$push({title:title,body:body,media:media,articleURL:articleURL}).then(function (article){
					api.newID = article.name();
					api.sync.index.articles.$set(articleURL, api.newID);
				});
			};
			api.removeArticle = function(name,id){
				api.sync.articles.$remove(id).then(function(){
					api.sync.index.articles.$remove(name);
				});

			};
			api.updateArticleTitle = function(oldURL ,id, title){
				console.log(id);
				console.log(title);
				var link = title.toLowerCase().replace(/'+/g, '').replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "-").replace(/^-+|-+$/g, '');
				console.log(link);
				api.sync.articles.$update(id, {title:title, articleURL:link}).then(function(article){
					console.log(article);
					api.newID = article.name();
					console.log(api.newID);
					api.sync.index.articles.$remove(oldURL);
					api.sync.index.articles.$set(link, api.newID);
				})
			};
			api.updateArticle = function(id, body, media){
				console.log(id +' '+ body);
				api.sync.articles.$update(id, {body:body, media:media});
			};
			return api;

	}]);