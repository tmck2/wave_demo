define(function() {
	var observable = function() {
			this.observers = []
	}

	observable.prototype = {
		addObserver: function(observer) {
			this.observers.push(observer)
		},
		notify: function() {
			this.observers.forEach(function(observer) {
				observer.update()
			})
		}
	}

	return observable
})