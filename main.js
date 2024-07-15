async function fetchData(city) {
  const apiKey = "d56a2972f596cb6046c1c6d7c5a25c52";
  const cityCords = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
  try {
    const response = await fetch(cityCords);

    // Check if the response is ok (status code in the range 200-299)
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    // Parse the JSON from the response
    const data = await response.json();

    // Check if data is not empty
    if (data.length === 0) {
      throw new Error("No data found for the specified city");
    }

    // Extract latitude and longitude
    const { lat, lon } = data[0];
    // Log the data to the console
    console.log(data);

    const weatherInfoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    try {
      const response = await fetch(weatherInfoUrl);

      // Check if the response is ok (status code in the range 200-299)
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      // Parse the JSON from the response
      const data = await response.json();

      // Extract weather description
      let weatherDescription = data.weather[0].description;
      weatherDescription = greekDescription(weatherDescription);
      const weatherIcon = data.weather[0].icon;
      const temperatureRaw = data.main.temp;
      const temperatureCelsius = temperatureRaw - 273.15;
      const temperature = temperatureCelsius.toFixed(2);
      const humidity = data.main.humidity;
      const wind = data.wind.speed;
      const cCode = data.sys.country;
      const time = data.dt; 
      const timezone = data.timezone;
      const localtime = convertToLocalTime(time,timezone);

      function convertToLocalTime(time, timezone) {
        // Convert timestamp to milliseconds
        const timestampInMs = time * 1000;
        
        // Create a Date object with the UTC timestamp
        const date = new Date(timestampInMs);
        
        // Get the UTC time in milliseconds
        const utcTimeInMs = date.getTime() + (date.getTimezoneOffset() * 60000);
        
        // Adjust for the local timezone offset (in seconds)
        const localTimeInMs = utcTimeInMs + (timezone * 1000);
        
        // Create a new Date object with the local time
        const localDate = new Date(localTimeInMs);
        
        const options = { hour: '2-digit', minute: '2-digit', hour12: false };
        const localTimeString = localDate.toLocaleTimeString('en-US', options);
        
        return localTimeString;
    }

      // Transform english description to greek
      function greekDescription(weatherDescription) {
        const weatherTranslations = {
          "clear sky": "καθαρός ουρανός",
          "few clouds": "λίγα σύννεφα",
          "scattered clouds": "σποραδικά σύννεφα",
          "broken clouds": "σπασμένα σύννεφα",
          "overcast clouds" : "νεφελώδης",
          "shower rain": "βροχή",
          "rain": "βροχή",
          "thunderstorm": "καταιγίδα",
          "snow": "χιόνι",
          "mist": "ομίχλη",
        };
        if (weatherTranslations.hasOwnProperty(weatherDescription)) {
          return weatherTranslations[weatherDescription];
        }

        return weatherDescription; // Return the original description if no translation is found
      }
      // Update the UI with the weather description
      // $("#output").html(`<span class ="text-center border-inline">Latitude: ${lat}, Longitude: ${lon} <br> Country Code : ${cCode}</br></span>`);
      $("#output").html(`<span class ="text-center border-inline">${city} <br> Κωδικός χώρας : ${cCode}</br></span>`);
      $("#weather").html(
        `<span class="text-center border-inline"><strong>Περιγραφή : </strong>${weatherDescription} </span>`
      );
      $("#localTime").html(
        `<span class="text-center border-inline"><strong>Tοπική ώρα : </strong>${localtime} (± 10 λεπτά) </span>`
      );
      $("#weather-icon").html(
        `<img src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt="Weather Icon">`
      );
      $("#temperature").html(
        `<span class="text-center border-inline"><strong>Θερμοκρασία : </strong>  ${temperature}  °C</span>`
      );
      temperatureColor(temperature);
      $("#humidity").html(
        `<span class="text-center border-inline"><strong>Υγρασία : </strong>  ${humidity}  %</p>`
      );
      $("#wind").html(
        `<span class="text-center border-inline"><strong>Ταχύτητα ανέμων : </strong>  ${(
          wind * 3.6
        ).toFixed(2)}   Km/hr</span>`
      );
      windCalculator((wind * 3.6).toFixed(2));
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }

    // Handle the data (e.g., update the UI)
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

function temperatureColor(temperature) {
  if (temperature < 0) {
    $(".container").removeClass("container-super-hot");
    $(".container").removeClass("container-hot");
    $(".container").removeClass("container-normal");
    $(".container").removeClass("container-cold");
    $(".container").addClass("container-super-cold");

    $(".custom-input").removeClass("container-super-hot");
    $(".custom-input").removeClass("container-hot");
    $(".custom-input").removeClass("container-normal");
    $(".custom-input").removeClass("container-cold");
    $(".custom-input").addClass("container-super-cold");
  }

  if (temperature < 8 && temperature > 0) {
    $(".container").removeClass("container-super-hot");
    $(".container").removeClass("container-hot");
    $(".container").removeClass("container-normal");
    $(".container").removeClass("container-super-cold");
    $(".container").addClass("container-cold");

    $(".custom-input").removeClass("container-super-hot");
    $(".custom-input").removeClass("container-hot");
    $(".custom-input").removeClass("container-normal");
    $(".custom-input").removeClass("container-super-cold");
    $(".custom-input").addClass("container-cold");
  }

  if (temperature > 9 && temperature < 29) {
    $(".container").removeClass("container-super-hot");
    $(".container").removeClass("container-hot");
    $(".container").addClass("container-normal");
    $(".container").removeClass("container-cold");

    $(".custom-input").removeClass("container-super-hot");
    $(".custom-input").removeClass("container-hot");
    $(".custom-input").addClass("container-normal");
    $(".custom-input").removeClass("container-cold");
  }

  if (temperature > 29 && temperature < 37) {
    $(".container").removeClass("container-normal");
    $(".container").removeClass("container-super-hot");
    $(".container").addClass("container-hot");
    $(".container").removeClass("container-cold");

    $(".custom-input").removeClass("container-normal");
    $(".custom-input").removeClass("container-super-hot");
    $(".custom-input").addClass("container-hot");
    $(".custom-input").removeClass("container-cold");
  }

  if (temperature > 37) {
    $(".container").removeClass("container-normal");
    $(".container").addClass("container-super-hot");
    $(".container").removeClass("container-cold");
    $(".container").removeClass("container-hot");
    $(".container").removeClass("container-super-cold");

    $(".custom-input").removeClass("container-normal");
    $(".custom-input").addClass("container-super-hot");
    $(".custom-input").removeClass("container-cold");
    $(".custom-input").removeClass("container-hot");
    $(".custom-input").removeClass("container-super-cold");
  }
}

function windCalculator(speed) {
  let result;
  if (speed < 5) {
    result = "Άπνοια, 0 Μποφόρ";
  } else if (speed >= 5 && speed <= 11) {
    result = "Σχεδόν άπνοια, 1 Μποφόρ";
  } else if (speed > 11 && speed <= 19) {
    result = "Πολύ ασθενείς, 2 Μποφόρ";
  } else if (speed > 19 && speed <= 28) {
    result = "Ασθενείς, 3 Μποφόρ";
  } else if (speed > 28 && speed <= 38) {
    result = "Σχεδόν μέτριοι, 4 Μποφόρ";
  } else if (speed > 38 && speed <= 49) {
    result = "Μέτριοι, 5 Μποφόρ";
  } else if (speed > 49 && speed <= 61) {
    result = "Ισχυροί, 6 Μποφόρ";
  } else if (speed > 61 && speed <= 74) {
    result = "Σφοδροί, 7 Μποφόρ";
  } else if (speed > 74 && speed <= 88) {
    result = "Θυελλώδεις, 8 Μποφόρ";
  } else if (speed > 88 && speed <= 102) {
    result = "Πολυ θυελλώδεις, 9 Μποφόρ";
  } else if (speed > 102 && speed <= 117) {
    result = "Θύελλα, 10 Μποφόρ";
  } else {
    result = "Σφοδρή θύελλα, 11+ Μποφόρ";
  }

  $("#wind-description").html(
    `<span class ="text-center border-inline">${result}</span>`
  ); // Update the HTML content of the element with ID 'wind'
}

let debounceTimeout;

$("#userInput").on("input", function () {
  const city = $("#userInput").val();

  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    // Call the function to fetch data
    fetchData(city);
  }, 1000);
});
