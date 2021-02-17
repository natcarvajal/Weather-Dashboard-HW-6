var APIKey = "beefdab294cbf81ff26e12192d4e7200";

$(document).ready(function () {
  var cities = [];
  function weatherInfo() {
    var city = $(this).attr("data-name");

    $.ajax({
      url:
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&units=imperial&appid=" +
        APIKey,
      method: "GET",
    }).then((response) => {
      show_all(response, "#results");
      console.log(response);

      var cityDiv = $("<div class='city'>");

      var name = $("<h1>").text(response.city.name);
      cityDiv.append(name);

      var date = $("<h2>").text(response.list[0].dt_txt);
      cityDiv.append(date);

      var icon = $("<img>").text(response.list[0].icon);

      cityDiv.append(icon);

      var temp = $("<p>").text(
        "Temperature: " + response.list[0].main.temp + " °F"
      );
      cityDiv.append(temp);

      var tempFeels = $("<p>").text(
        "Feels Like: " + response.list[0].main.feels_like + " °F"
      );
      cityDiv.append(tempFeels);

      var humidity = $("<p>").text(
        "Humidity: " + response.list[0].main.humidity + " %"
        // response.list.forecast.humidity.unit
      );
      cityDiv.append(humidity);

      var windSpeed = $("<p>").text(
        "Windspeed: " + response.list[0].wind.speed + " MPH"
      );
      cityDiv.append(windSpeed);

      $("#city-view").prepend(cityDiv);
    });
  }
  function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < cities.length; i++) {
      var b = $("<button>");
      b.addClass("city-btn");
      b.attr("data-name", cities[i]);
      b.text(cities[i]);
      $("#buttons-view").append(b);
    }
  }

  $("#add-city").on("click", function (event) {
    event.preventDefault();
    var city = $("#inputValue").val().trim();
    cities.push(city);
    get_weather_from_city(city);
    renderButtons();
  });

  $(document).on("click", ".city-btn", weatherInfo);
  renderButtons();
});

$("#results").html("");

function get_weather_from_city(city) {
  var lat_long_converter = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=186b21989f4f41248158d08544154950`;
  $.get(lat_long_converter, (data) => {
    console.log(data);
    $("#searched_city").append(`<h2>${data.results[0].formatted}</h2>`);
    $("#searched_city").append(`<h3>${data.timestamp.created_http}</h3>`);
    let lat = data.results[0].geometry.lat;
    let lng = data.results[0].geometry.lng;
    var one_call = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=hour&units=imperial&appid=${APIKey}`;
    $.get(one_call, (data) => {
      console.log(data);
      // Design Card and UI for searched City
      $("#searched_city").append(`<h1>${city}</h1>`);
      $("#searched_city").append(
        `<p>Temperature: ${data.daily[0].temp.day} °F </p>
        <p>Humidity: ${data.daily[0].humidity} % </p>
        <p>Windspeed: ${data.daily[0].wind_speed} MPH </p>
        <p>UV Index: ${data.daily[0].uvi} </p>`
      );
      // data.daily.forEach((day) => $("#searched_city").append(day.clouds));
      // $("#searched_city").append(data.current.uvi);
      for (let i = 0; i < 5; i++) {
        let day = data.daily[i];
        $("#results").append(`<div class='icard'>
            <p>Temperature: ${day.temp.day} °F</p>
            <p>Humidity: ${day.humidity} % </p>
            <p>Windspeed: ${day.wind_speed} MPH </p>
            <p>UV Index: ${day.uvi} </p>`);
      }
    });
  });
}

get_weather_from_city(city);
{
  /* <p>
        <h1>5-Day Forecast</h1>
        <div class="card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="card-link">Card link</a>
            <a href="#" class="card-link">Another link</a>
          </div>
        </div>
      </p> */
}
