"use strict";

$.get("http://api.openweathermap.org/data/2.5/onecall", {
    appid: WEATHER_MAP_TOKEN,
    lat: 29.42,
    lon: -98.49,
    units: "imperial"
}).done(function(data) {
    console.log(data);


    // DYNAMICALLY GENERATE CARDS
    for(var i = 0; i < data.daily.length - 3; i++) {

        var currentDate = new Date(data.daily[i].dt * 1000);
        var dateTime =
            + (currentDate.getMonth()+1)  + "/"
            + currentDate.getDate() + "/"
            + currentDate.getFullYear();
        var maxTemp = Math.round(data.daily[i].temp.max);
        var minTemp = Math.round(data.daily[i].temp.min);
        var desc = data.daily[i].weather[0].description;
        var humidity = data.daily[i].humidity;
        var windSpeed = Math.round(data.daily[i].wind_speed);
        var windDirection = windCardinalDirection(data.daily[i].wind_deg);
        var icon = '\"http://openweathermap.org/img/wn/' + data.daily[i].weather[0].icon + '@2x.png\"';


        $('#forecast').append(
            '<div class="card text-dark bg-light mb-3" style="max-width: 18rem;">' +
            '<h5 class="card-header date text-center">' +
            dateTime +
            '</h5>' +
            '<div class="card-body">' +
            '<h6 class="description text-center">' +
            desc +
            '</h6>' +
            '<img src=' +
            icon + 'class="mx-auto">' +
            '<div class="temperature text-center m-1">' +
            '<h6 class="max-temp">' +
            'High: ' +
            maxTemp +
            '°F' +
            '</h6>' +
            '<h6 class="min-temp">' +
            'Low: ' +
            minTemp +
            '°F' +
            '</h6>' +
            '</div>' +
            '<br><br><br>' +
            '<h6 class="humidity text-center">' +
            'Humidity: ' +
            humidity +
            '%' +
            '</h6>' +
            '<h6 class="wind-speed text-center">' +
            'Wind: ' +
            windSpeed +
            ' MPH ' +
            windDirection +
            '</h6>' +
            '</div></div>'
        )};

    mapboxgl.accessToken = MAPBOX_API_TOKEN;
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        zoom: 12,
        center: [-98.49, 29.42]
    });


    var marker = new mapboxgl.Marker({draggable: true})
        .setLngLat([-98.49, 29.42])
        .addTo(map);





});





// This function takes a number between 0 and 360 and returns a
// wind direction abbreviation. the MapBox API gives us a "wind degrees" datum
// this takes the "wind degrees" and converts it into a familiar abbreviation
function windCardinalDirection(degrees){
    let cardinalDirection = '';
    if ((degrees > 348.75 && degrees <= 360) || (degrees >=0 && degrees <= 11.25)){
        cardinalDirection = "N";
    } else if (degrees > 11.25 && degrees  <= 33.75) {
        cardinalDirection = "NNE";
    } else if (degrees > 33.75 && degrees <= 56.25) {
        cardinalDirection = "NE";
    } else if (degrees > 56.25 && degrees <= 78.75) {
        cardinalDirection = "ENE";
    } else if (degrees > 78.75 && degrees <= 101.25) {
        cardinalDirection = "E";
    } else if (degrees > 101.25 && degrees <= 123.75) {
        cardinalDirection = "ESE";
    } else if (degrees > 123.75 && degrees <= 146.25) {
        cardinalDirection = "SE";
    } else if (degrees > 146.25 && degrees <= 168.75) {
        cardinalDirection = "SSE";
    } else if (degrees > 168.75 && degrees <= 191.25) {
        cardinalDirection = "S";
    } else  if (degrees > 191.25 && degrees <= 213.75) {
        cardinalDirection = "SSW";
    } else if (degrees > 213.75 && degrees <= 236.25)  {
        cardinalDirection = "SW";
    } else if (degrees > 236.25 && degrees <= 258.75) {
        cardinalDirection = "WSW";
    } else if (degrees > 258.75 && degrees <= 281.25) {
        cardinalDirection = "W";
    } else if (degrees > 281.25 && degrees <= 303.75) {
        cardinalDirection = "WNW";
    } else if (degrees > 303.75 && degrees <= 326.25) {
        cardinalDirection = "NW";
    } else if (degrees > 326.75 && degrees <= 348.75) {
        cardinalDirection = "NNW";
    }
    return cardinalDirection;
}

// this function appends leading zeroes, for example if you need a
// month in the format 08 instead of 8, or a time like 08:00 instead
// of 8:00
function appendLeadingZeroes(n){
    if(n <= 9){
        return "0" + n;
    }
    return n;
}