$(document).ready(function() {
  function formatTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
  
    return hours + ':' + minutes + ' ' + ampm;
  }

  function formatDay(date) {
    const dayArray = date.getDay();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    const day = days[dayArray];
    return day;
  }

  const currentTime = $(".time");
  let newCurrentTime = new Date();
  currentTime.html(formatTime(newCurrentTime));

  function displayWeatherInfo(response) {
    $(".name").html(`${response.name}`);
  
    const temperature = Math.round(response.main.temp - 273.15);
    $(".temp").html(`${temperature}°C`);
    $(".temp123").html(`${temperature}°C`);
    const feeltemperature = Math.round(response.main.feels_like - 273.15);
    $(".feelLike").html(`${feeltemperature}°C`);
    const humidity = response.main.humidity;
    $(".humidity").html(`${humidity}%`);
    $(".condition").html(response.weather[0].main);
    const pressure = response.main.pressure;
    $(".pressure").html(`${pressure}hPa`);
    const visibility = response.visibility;
    $(".Visibility").html(`${visibility}m`);

    const timezoneOffsetInSeconds = new Date().getTimezoneOffset() * 60;
    const localTimeInSeconds = Math.floor(Date.now() / 1000) + response.timezone + timezoneOffsetInSeconds;
    const localDate = new Date(localTimeInSeconds * 1000);

    // Display the local time and date of the city
    $(".time").html(formatTime(localDate));
    $(".date").html(formatDay(localDate));
  }

  function searchCity(city) {
    const apikey = "d09a9a23922bc6f8ca3b00e882ce67c3";
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        displayWeatherInfo(data);
      })
      .catch(error => {
        console.error("Error: ", error);
        document.getElementById("weather-data").innerHTML = "Error fetching weather data. Please try again later.";
      });
  }

  $("#locationinput").on("submit", function(event) {
    event.preventDefault();
    let city = document.getElementById("search").value;
    console.log(city);
    searchCity(city);
  });
  searchCity("Chiniot");
});