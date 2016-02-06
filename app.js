var PI = 3.14159265359
var NUM_SAMPLES = 500

function addFunctions(f, g) {
	return function(t) {
		return f(t) + g(t)
	}
}

var model = {
	getSamples: function(t) {
		var f = function(t) {
			return 0.01 * (Math.sin((2*PI)/NUM_SAMPLES*i+t/10)+20);
		}
		var g = function(t) {
			return 0.08 * (Math.cos((0.5*PI)/NUM_SAMPLES*i+t/10)+3);
		}
		var wave = addFunctions(f,g)

		samples = []
		for(i=0; i<NUM_SAMPLES; i++)
		{
			samples.push(wave(t))
		}
		return samples
	}
};

var app = {
	init: function() {
		var self = this
		this.time = 0
		setInterval(function() {
			self.time++
			view.render()
		}, 30)
		view.init()
	},
	getSamples: function() {
		return model.getSamples(this.time)
	}
};

var view = {
	init: function() {
		this.container = document.getElementById('container')
		this.render()
	},
	render: function() {
		var samples = app.getSamples()
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

app.init();