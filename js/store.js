(function (window) {
	'use strict';
	/**
	@param {string}
	@param {function}
	*/
	function Store(name, callback) {
		callback = callback || function()  {};
		
		this._dbName = name;
		
		if(!localStorage.getItem(name)) {
			var todos = [];
			localStorage.setItem(name, JSON.stringify(todos));
		}
		
		callback.call(this, JSON.parse(localStorage.getItem(name)));
	}
	/**
	@param {object}
	@param {function}
	
	@example
	*/
	
	Store.prototype.find = function(query, callback) {
		if(!callback) {
			return;
		}
		
		var todos = JSON.parse(localStorage.getItem(this._dbName));
		
		callback.call(this, todos.filter(function (todo) {
			for(var q in query) {
				if(query[q] !== todo[q]) {
					return false;
				}
			} 
			return true;
		}));
	};
	/**
	@param {function}
	*/
	Store.prototype.findAll = function(callback) {
	callback = callback || function() {};
	callback.call(this, JSON.parse(localStorage.getItem(this._dbName)));
	};
	/**
	@param {object}
	@param {function}
	@param {number}
	*/
	Store.prototype.save = function(updateData, callback, id) {
		var todos = JSON.parse(localStorage.getItem(this._dbName));
		
		callback = callback || function() {};
		
		if(id) {
			for(var i = 0; i < todos.length; i++) {
				if(todos[i].id === id) {
					for(var key in updateData) {
						todos[i][key] = updateData[key];
					}
					break;
				}
			}
			
			localStorage.setItem(this._dbName, JSON.stringify(todos));
			callback.call(this, todos);
		}
		else {
			updateData.id =new Date().getTime();
			
			todos.push(updateData);
			localStorage.setItem(this._dbName, JSON.stringify(todos));
			callback.call(this, [updateData]);
		}
	};
	/**
	*@param {number}
	*@param {function}
	*/
	Store.prototype.remove = function(id, callback) {
		var todos = JSON.parse(localStorage.getItem(this._dbName));
		
		for(var i = 0; i < todos.length; i++) {
			if(todos[i].id == id) {
				todos.splice(i, 1);
				break;
		}
		}
		
		localStorage.setItem(this._dbName, JSON.stringify(todos));
		callback.call(this, todos);
	};
	/**
	@param {function}
	*/
	Store.prototype.drop = function(callback) {
		var todos = [];
		localStorage.setItem(this._dbName, JSON.stringify(todos));
		callback.call(this, todos);
	};
	
	window.app = window.app || {};
	window.app.Store = Store;
})(window);