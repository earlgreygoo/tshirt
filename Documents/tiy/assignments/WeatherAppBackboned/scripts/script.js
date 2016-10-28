var qs = function(sel) { return document.querySelector(sel)}

// apikey = cd31ec518c172c1a2086aadbf90a38f9



var baseUrl = "https://api.darksky.net/forecast/cd31ec518c172c1a2086aadbf90a38f9/",
	currentbutt = document.querySelector("#current"),
	hourlybutt = document.querySelector("#hourly"),
	dailybutt = document.querySelector("#daily"),
	currentTempNode = document.querySelector(".currentTemp"),
	lu = "",
	weatherobject = {}





var dailyUrl = function(positionObject) {
	
	currentLat = positionObject.coords.latitude
	currentLong = positionObject.coords.longitude
	currentUrl = baseUrl + currentLat + "," + currentLong
	var promise = $.getJSON(currentUrl)
	promise.then(renderCurrent)
}


var renderCurrent = function(apiresponse) {
	
	currentTempNode.innerHTML = "yo it's " + apiresponse.currently.temperature + " weathers outside"
}


/////views//////




var displayCurrent = function() {
	// get current location

	navigator.geolocation.getCurrentPosition(dailyUrl)

	// in my callback for the current location, use the current location to request forecast data


	// in the .then callback for that request, run another function that renders the response
}


var hourlyUrl = function(positionObject) {

	currentLat = positionObject.coords.latitude
	currentLong = positionObject.coords.longitude
	currentUrl = baseUrl + currentLat + "," + currentLong
	var promise = $.getJSON(currentUrl)
	promise.then(renderHourly)
}

var displayHourly = function() {
	navigator.geolocation.getCurrentPosition(hourlyUrl)
}



var renderHourly = function(apiResponse) {

	hourWeather = apiResponse.hourly.data
	var outputlist = ""
	for(var i = 0; i < 6; i ++){
			
		if (i === 0 ){
			outputlist +=   "<li class = 'hourly'> right now it's " + hourWeather[i].temperature + "</li>"
		}
		else if (i === 1) {
			outputlist +=   "<li class = 'hourly'>" + i + "hour from now it will be " + hourWeather[i].temperature + "</li>"
		} 
		else {
			outputlist +=   "<li class = 'hourly'>" + i + "hours from now it will be " + hourWeather[i].temperature + "</li>"
		}
	}
	currentTempNode.innerHTML = outputlist


}

var dailyUrl = function(positionObject) {

	currentLat = positionObject.coords.latitude
	currentLong = positionObject.coords.longitude
	currentUrl = baseUrl + currentLat + "," + currentLong
	var promise = $.getJSON(currentUrl)
	promise.then(renderDaily)
}

var displayDaily = function() {
	navigator.geolocation.getCurrentPosition(dailyUrl)
}

var renderDaily = function(apiResponse) {
		var dailyWeather = apiResponse.daily.data
		
		var outputlist = ""
		for(var i = 0; i < 7; i++) {
			outputlist += "<li class = 'daily'>" + i + "days from now it will be a high of " + dailyWeather[i].temperatureMax + " and a low of " + dailyWeather[i].temperatureMin + "</li>"
		}
		currentTempNode.innerHTML = outputlist
	
}


var weatherSearch = function(currentUrl) {
	var promise = $.getJSON(currentUrl)
	return promise
}


var handleViewChange = function(e) {
	location.hash = "#" + e.target.value
}
qs('.buttContainer').addEventListener('click',handleViewChange)


var WeatherRouter = Backbone.Router.extend( {
	routes: {
		"current": "handleCurrent",
		"hourly": "handleHourly",
		"daily": "handleDaily"
	},
	handleCurrent: function() {
		displayCurrent()
	},
	handleHourly: function() {
		
		displayHourly()
	},
	handleDaily: function() {
		displayDaily()
	},

	initialize: function(){ 
		Backbone.history.start()
	}


})

var weatherRouter = new WeatherRouter()

