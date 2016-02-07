define(function () {
	function model() {
		this.observers = []
		this.value = 0	
	}

	model.prototype = {
		getValue: function() {
			return this.value
		},
		setValue: function(newval) {
			if(newval < 0 || newval > 100) return

			this.value = newval
			this.notifyObservers()
		},
		addObserver: function(observer) {
			this.observers.push(observer)
		},
		notifyObservers: function() {
			this.observers.forEach(function(observer) {
				observer.update()
			})
		}
	}

	function controller(container) {
		var self = this;
		self.model = new model()

		div = document.createElement('div')
		div.className = 'slider'
		grip = document.createElement('div')
		grip.className = 'grip'
		div.appendChild(grip)
		container.appendChild(div)

		self.view = new view(div, self, self.model)
	}

	controller.prototype = {
		startDragging: function(x) {
			this.startingCoord = x
		},
		drag: function(x) {
			if (this.startingCoord) {
				var offset = x - this.startingCoord;
				this.model.setValue(this.model.getValue() + offset)
				this.startingCoord = x
			}
		},
		endDragging: function(x) {
			delete this.startingCoord
		}
	}

	function view(container, controller, model) {
		var self = this

		self.model = model

		self.grip = container.getElementsByClassName('grip')[0]
		model.addObserver({update: function() {
			render()
		}})

		self.grip.addEventListener('mousedown', function(e) {
			controller.startDragging(e.clientX);
		})

		document.addEventListener('mouseup', function(e) {
			controller.endDragging(e.clientX)
		})

		document.addEventListener('mousemove', function(e) {
			controller.drag(e.clientX)
		})

		render()
	
		function render() {
			self.grip.style.left = self.model.value / 100 * 90
		}

		return {
			render: render
		}
	}

	return { controller: controller }
})
