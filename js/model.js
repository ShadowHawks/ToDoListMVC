(function (window) {
		'use strict';
		/**
		@constructor 
		@param {object}
		*/
		function Model(storage) {
			this.storage = storage;
		}
		/**
		@param {string}
		@param {function}
		*/
		Model.prototype.create = function (title, callback) {
			title = title || '';
			callback = callback || function() {};
			
			var newItem = {
				title: title.trim(),
				completed: false
			};
			
			this.storage.save(newItem, callback);
		};
		/**
		@param {string|number|object}
		@param {function}
		
		@example 
		*/
		Model.prototype.read = function(query, callback) {
			var queryType = typeof query;
			callback = callback || function() {};
			
			if(queryType === 'function') {
				callback = query;
				return this.storage.findAll(callback);
			} 
			else if(queryType === 'string' || queryType === 'number') {
				query = parseInt(query, 10);
				this.storage.find({ id: query }, callback);
			}
			else {
				this.storage.find(query, callback);
			}
		};
		/**
		@param {number} 
		@param {object}
		@param {function}
		*/
		Model.prototype.update = function(id, data, callback)  {
			this.storage.save(data, callback, id);
		};
		/**
		@param {number}
		@param {function}
		*/
		Model.prototype.remove = function(id, callback)  {
			this.storage.remove(id, callback);
		};
		/**
		@param {function}
		*/
		Model.prototype.removeAll = function(callback) {
			this.storage.drop(callback);
		};
		
		Model.prototype.getCount = function(callback) { 
		var todos = {
			active: 0,
			completed: 0,
			total: 0
		};
		
		this.storage.findAll(function (data) {
			data.forEach(function (todo) {
				if (todo.completed) {
					todos.completed++;
				} 
				else { 
				todos.active++;
				}
				todos.total++;
			});
			callback(todos);
		});
		};
	window.app = window.app || {};
	window.app.Model = Model;
})(window);
		
		