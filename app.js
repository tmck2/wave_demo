require(['observable', 'slider', 'utilities'], function(observable, slider, utilities) {
	var PI = 3.14159265359
	var NUM_SAMPLES = 300

	function wave() {
		this.a = 0.25
		this.b = 2
		this.c = 0
		this.d = 0
		this.time = 0
	}

	wave.prototype = {
		getSamples: function() {
			var a = this.a;
			var b = this.b;
			var c = this.c;
			var d = this.d;
			samples = []
			for(i=0; i<NUM_SAMPLES; i++)
			{
				samples.push(a * (Math.sin((b*PI)/NUM_SAMPLES*i+c/10)+d))
			}
			return samples
		},
		setValue: function(prop, val) {
			this[prop] = val
			this.notify()
		},
		getValue: function(prop) {
			return this[prop]
		}
	};

	var controller = function() {
		var self = this

		self.model = new wave()
		utilities.extend(self.model, new observable())
		self.view = new view(self.model)

		self.sliderContainer = document.getElementById('sliders')
		self.aslider = new slider.controller(self.sliderContainer)
		self.bslider = new slider.controller(self.sliderContainer)
		self.cslider = new slider.controller(self.sliderContainer)
		self.dslider = new slider.controller(self.sliderContainer)

		self.aslider.model.addObserver({update: function() {
			self.model.setValue('a', self.aslider.model.getValue() / 300)
		}})

		self.bslider.model.addObserver({update: function() {
			self.model.setValue('b', self.bslider.model.getValue() / 5)
		}})

		self.cslider.model.addObserver({update: function() {
			self.model.setValue('c', self.cslider.model.getValue() * PI)
		}})

		self.dslider.model.addObserver({update: function() {
			self.model.setValue('d', self.dslider.model.getValue() / 25)
		}})

		self.aslider.model.setValue(50)
		self.bslider.model.setValue(50)
		self.cslider.model.setValue(50)
		self.dslider.model.setValue(50)
	}

	function view(model) {
		this.model = model
		this.container = document.getElementById('container')
		model.addObserver(this)
	}

	view.prototype = {		
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

	new controller()
})