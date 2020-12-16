$(document).ready(() => {
  var now = dayjs().format("dddd, MMMM DD, YYYY");
  $("#currentDay").append(now);
});
