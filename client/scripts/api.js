angular.module('app.services', ['firebase'])
	.factory('api', ['$firebase',
		function($firebase) {

			var api = {show:{},sync:{index:{}},index:{}};

			var types = ['media','clients','services','articles', 'about','products'];
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
				var link = title.toLowerCase().replace(/'+/g, '').replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "-").replace(/^-+|-+$/g, '');
				api.sync.media.$update(id, {mediaTitle:title, mediaLink:link}).then(function(media){
					api.newID = media.name();
					if(api.sync.index.media[link] === false){
						api.sync.index.media.$set(link, api.newID);
					}
				})
			};
			api.removeMedia = function(name,id){
				api.sync.media.$remove(id).then(function(){
					api.sync.index.media.$remove(name);
				});

			};

// Add to Content
			api.addContentMedia = function(content, id, media){
				media.unshift(id);
			};
			api.removeContentMedia = function(media, id){
				for(var i=0; i< media.length; i++){
					if(media[i] === id){
						media.splice(i, 1);  //removes 1 element at position i
						break;
					}
				}
			};
			api.addContentArticles = function(content, id, articles){
				if(articles[0]==='No Articles'){
					articles[0]=id;
				} else {
					articles.push(id);
				}
			};
			api.removeContentArticles = function(articles, id){
				for(var i=0; i< articles.length; i++){
					if(articles[i] === id){
						articles.splice(i, 1);  //removes 1 element at position i
					}
				}
				if(articles.length === 0){
					articles[0] = 'No Articles';
				}
			};
			api.addVariation = function(variation, variations){
				if(variations[0]==='No Variations'){
					variations[0]={name:variation.name, description:variation.description};
				} else {
					variations.push({name:variation.name, description:variation.description});
				}
			};
			api.removeVariation = function(index, variations){
				variations.splice(index, 1);
				if(variations.length === 0){
					variations[0] = 'No Variations';
				}
			};

// Clients
			api.saveClient = function(title, description, media){
				if(!media){
					media = '';
				}
				this.media = media;
				var clientURL = title.toLowerCase().replace(/'+/g, '').replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "-").replace(/^-+|-+$/g, '');
				api.sync.clients.$push({title:title,media:media,description:description,clientURL:clientURL}).then(function (client){
					api.newID = client.name();
					if(!api.show.clients.$getRecord(api.newID).media){
						api.sync.clients.$update(api.newID, {media:['']});
					}
					api.sync.index.clients.$set(clientURL, api.newID);
				});
			};
			api.removeClient = function(name,id){
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
				api.sync.clients.$update(id, {description:description, media:media});
			};

// Services
			api.saveService = function(title, description, variations, media, articles){
				if(!media){
					media = '';
				}
				if(!variations){
					variations = 'No Variations';
				}
				if(!articles){
					articles = 'No Articles';
				}
				this.media = media;
				var serviceURL = title.toLowerCase().replace(/'+/g, '').replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "-").replace(/^-+|-+$/g, '');
				api.sync.services.$push({title:title,description:description,variations: variations, serviceURL:serviceURL, media:media, articles:articles}).then(function (service){
					api.newID = service.name();
					if(!api.show.services.$getRecord(api.newID).media){
						api.sync.services.$update(api.newID, {media:['']});
					}
					api.sync.index.services.$set(serviceURL, api.newID);
				});
			};
			api.removeService = function(name,id){
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
			api.updateService = function(id, description, variations, media, articles){
				api.sync.services.$update(id, {description:description, variations:variations, media:media, articles:articles});
			};
// Products
			api.saveProduct = function(title, description, variations, media, articles){
				if(!media){
					var media = [];
					media[0] = '';
				}
				if(!variations){
					var variations = [];
					variations[0] = 'No Variations';
				}
				if(!articles){
					var articles = [];
					articles[0] = 'No Articles';
				}
				this.media = media;
				var productURL = title.toLowerCase().replace(/'+/g, '').replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "-").replace(/^-+|-+$/g, '');
				api.sync.products.$push({title:title,description:description, variations: variations, productURL:productURL, media:media, articles:articles}).then(function (product){
					api.newID = product.name();
					if(!api.show.products.$getRecord(api.newID).media){
						api.sync.products.$update(api.newID, {media:['']});
					}
					if(!api.show.products.$getRecord(api.newID).variations){
						api.sync.products.$update(api.newID, {variations:['']});
					}
					if(!api.show.products.$getRecord(api.newID).articles){
						api.sync.products.$update(api.newID, {articles:['']});
					}
					api.sync.index.products.$set(productURL, api.newID);
				});
			};
			api.removeProduct = function(name,id){
				api.sync.products.$remove(id).then(function(){
					api.sync.index.products.$remove(name);
				});

			};
			api.updateProductTitle = function(id, title){
				var link = title.toLowerCase().replace(/'+/g, '').replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "-").replace(/^-+|-+$/g, '');
				api.sync.products.$update(id, {title:title, productURL:link}).then(function(product){
					api.newID = product.name();
					api.sync.index.products.$set(link, api.newID);
				})
			};
			api.updateProduct = function(id, description, variations, media, articles){
				api.sync.products.$update(id, {description:description, variations:variations, media:media, articles:articles});
			};
// About

			api.updateAbout = function(id, text){
				api.sync.about.$update(id, {description:text});
				api.aboutSaved = 'About Saved!'
			};
// Articles
			api.saveArticle = function(title, body, media){
				if(!media){
					media = '';
				}
				this.media = media;
				var articleURL = title.toLowerCase().replace(/'+/g, '').replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "-").replace(/^-+|-+$/g, '');
				api.sync.articles.$push({title:title,body:body,media:media,articleURL:articleURL}).then(function (article){
					api.newID = article.name();
					if(!api.show.articles.$getRecord(api.newID).media){
						api.sync.articles.$update(api.newID, {media:['']});
					}
					api.sync.index.articles.$set(articleURL, api.newID);
				});
			};
			api.removeArticle = function(name,id){
				api.sync.articles.$remove(id).then(function(){
					api.sync.index.articles.$remove(name);
				});

			};
			api.updateArticleTitle = function(oldURL ,id, title){
				var link = title.toLowerCase().replace(/'+/g, '').replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "-").replace(/^-+|-+$/g, '');
				api.sync.articles.$update(id, {title:title, articleURL:link}).then(function(article){
					api.newID = article.name();
					api.sync.index.articles.$remove(oldURL);
					api.sync.index.articles.$set(link, api.newID);
				})
			};
			api.updateArticle = function(id, body, media){
				api.sync.articles.$update(id, {body:body, media:media});
			};

			return api;

	}]);