$(document).ready(function () {
  var APIKey = "beefdab294cbf81ff26e12192d4e7200";
  var queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=München,DE&units=imperial&appid=" +
    APIKey;
  // var one_call = "https://api.openweathermap.org/data/2.5/onecall?";
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then((response) => {
    console.log(response);
    $(".display-4").append(response.city.name);
    $(".temperature").append(response.list[0].main.temp);
    $(".temperature").append(response.list[0].main.temp);
  });
});
