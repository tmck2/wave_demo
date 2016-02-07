var test
requirejs(['components/slider'], function(slider) {
	var PI = 3.14159265359
	var NUM_SAMPLES = 64

	var wave = function(a,b,c,d)
	{
		return function(t) {
			return a * (Math.sin((b*PI)/NUM_SAMPLES*t+c/10)+d);
		}
	}

	var model = {
		init: function() {
			test = this
			this.a = 0.25
			this.b = 2
			this.c = 0
			this.d = 0
			this.time = 0
			this.observers = []
		},
		getSamples: function() {
			var a = this.a;
			var b = this.b;
			var c = this.c;
			var d = this.d;
			samples = []
			for(i=0; i<NUM_SAMPLES; i++)
			{
				samples.push(wave(a,b,c,d)(this.time+i))
			}
			return samples
		},
		setValue: function(prop, val) {
			this[prop] = val
			this.notifyObservers()
		},
		getValue: function(prop) {
			return this[prop]
		},
		addObserver: function(observer) {
			this.observers.push(observer)
		},
		notifyObservers: function() {
			this.observers.forEach(function(observer) {
				observer.update()
			})
		}
	};

	var app = {
		init: function() {
			var self = this

			model.init()
			view.init(model)

			self.sliderContainer = document.getElementById('sliders')
			self.aslider = new slider.controller(self.sliderContainer)
			self.bslider = new slider.controller(self.sliderContainer)
			self.cslider = new slider.controller(self.sliderContainer)
			self.dslider = new slider.controller(self.sliderContainer)
			
			self.aslider.model.addObserver({update: function() {
				model.setValue('a', self.aslider.model.getValue() / 300)
			}})

			self.bslider.model.addObserver({update: function() {
				model.setValue('b', self.bslider.model.getValue() / 5)
			}})

			self.cslider.model.addObserver({update: function() {
				model.setValue('c', self.cslider.model.getValue() * PI)
			}})

			self.dslider.model.addObserver({update: function() {
				model.setValue('d', self.dslider.model.getValue() / 25)
			}})
		}
	};

	var view = {
		init: function(model) {
			this.model = model
			this.container = document.getElementById('container')
			model.addObserver(this)
		},
		update: function() {
			this.render()
		},
		render: function() {
			var samples = this.model.getSamples()
			var width = 500 / NUM_SAMPLES
			var docfrag = document.createDocumentFragment()
			for(i=0; i<samples.length; i++)
			{
				var div = document.createElement('div')
				div.className = 'bar'
				div.style.width = width
				div.style.height = samples[i]*400
				div.style.left = i * width
				div.style.bottom = 0
				docfrag.appendChild(div)
			}
			container.innerHTML = ''
			container.appendChild(docfrag)
		}
	};

	app.init()
})