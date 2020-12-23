$(document).ready(function () {
  var cities = [];
  function weatherInfo() {
    var city = $(this).attr("data-name");
    var APIKey = "beefdab294cbf81ff26e12192d4e7200";
    $.ajax({
      url:
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&units=imperial&appid=" +
        APIKey,
      method: "GET",
    }).then((response) => {
      console.log(response);

      var cityDiv = $("<div class='city'>");

      var name = $("<h1>").text(response.city.name);
      cityDiv.append(name);

      var temp = $("<p>").text("Temperature: " + response.list[0].main.temp);
      cityDiv.append(temp);

      var humidity = $("<p>").text(
        "Humidity: " + response.list[0].main.humidity
      );
      cityDiv.append(humidity);

      var windSpeed = $("<p>").text(
        "Windspeed: " + response.list[0].wind.speed
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
    renderButtons();
  });
  $(document).on("click", ".city-btn", weatherInfo);
  renderButtons();
});
//   $(".display-4").text(response.city.name);
//   $(".temperature").text(response.list[0].main.temp);
//   $(".humidity").text(response.list[0].main.humidity);
//   $(".windspeed").text(response.list[0].wind.speed);

// $.ajax({
//   url: one_call,
//   method: "GET",
// }).then((response) => {
//   console.log(response);
//   $(".uv-index").append(response.value);
