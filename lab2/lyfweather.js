var query = {
    'APPID': "4d4a3a5ffdf01b1674557edce6461b66",
    'mode': "json",
};
//var current = $("<section class="current-weather"><img class="icon" src="" alt="" /><section class="current-temp"></section></section>");
//var today = $("<section class="today-weather"></section>");
//var forecast = $("<section class="forecast"></section>");
var weather = $("<section class=\"weather\"><img class=\"weather-icon\" src=\"\" alt=\"\" /><span class=\"weather-desc\"></span></section>");
function setUnit(unit){
    query["unit"] = "metric";
}
function layout(wd) {
    widget = $(".lyfweather");
    widget.find(".current-temp").html(Math.round(wd.main.temp-273.15)+"&deg;C");
    widget.find(".low-temp").html("Lowest: "+Math.round(wd.main.temp_min-273.15)+"&deg;C");
    widget.find(".high-temp").html("Highest: "+Math.round(wd.main.temp_max-273.15)+"&deg;C");
    widget.find(".humidity").html(wd.main.humidity+"%");
    widget.find(".atm").html(wd.main.pressure+"hPa");
    widget.find(".wind-speed").html(wd.wind.speed+"m/s");
    widget.find(".wind-dir").html(wd.wind.deg);
    $.each(wd.weather, function(wi, wt){
        var neww = weather.clone();
        neww.find(".weather-icon").attr("src","http://openweathermap.org/img/w/"+wt.icon+".png");
        neww.find(".weather-desc").html(wt.description);
        neww.prependTo(widget.find(".current-weather"));
    });
}
function getWeatherByGeo() {
    delete query.q;
    navigator.geolocation.getCurrentPosition(function(position) {
        query["lat"] = position.coords.latitude;
        query["lon"] = position.coords.longitude;
        query["cnt"] = 5;
        getWeather();
    });
}
function getWeatherByCity(city){
    delete query.lat;
    delete query.lon;
    query["q"] = city;
    query["cnt"] = 5;

    getWeather();
}

function getWeather(){
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/find",
        dataType: "jsonp",
        data: query,
        type: "GET",
        success: function(wdr, status, xhr) {
            $.each(wdr.list, function(cind, city){
                var ncity = $("<option></option>").html(city.name);
                console.log(ncity);
                console.log($("form[name='nearby-cities'] select"));
                ncity.appendTo($("form[name='nearby-cities'] select"));
            });
            layout(wdr.list[0]);
        }
    });
}

$(document).ready(function(){
    getWeatherByGeo();
});
