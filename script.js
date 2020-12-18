$(document).ready(function () {
  var cityName = $("#inputValue");
  var APIKey = "beefdab294cbf81ff26e12192d4e7200";
  var queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=München,DE&units=imperial&appid=" +
    APIKey;
  var one_call =
    "http://api.openweathermap.org/data/2.5/uvi?lat=48.1374&lon=11.5755&appid=" +
    APIKey;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then((response) => {
    console.log(response);
    $(" .display-4").append(response.city.name);
    $(" .temperature").append(response.list[0].main.temp);
    $(" .humidity").append(response.list[0].main.humidity);
    $(" .windspeed").append(response.list[0].wind.speed);
  });
  $.ajax({
    url: one_call,
    method: "GET",
  }).then((response) => {
    console.log(response);
    $(" .uv-index").append(response.value);
  });
});
