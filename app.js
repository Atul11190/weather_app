const apiKey = 'f681977af857029b5f621d154c13dce9'; // Get your API key from OpenWeatherMap

document.addEventListener('DOMContentLoaded', () => {
    const getWeatherButton = document.getElementById('getWeather');
    const locationInput = document.getElementById('locationInput');
    const weatherData = document.getElementById('weatherData');

    getWeatherButton.addEventListener('click', () => {
        const location = locationInput.value.trim();
        if (location) {
            getWeatherData(location);
        } else {
            alert('Please enter a city name.');
        }
    });

    function getWeatherData(location) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

        fetch(apiUrl)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('City not found');
                }
            })
            .then(data => {
                displayWeatherData(data);
            })
            .catch(error => {
                weatherData.innerHTML = `Error: ${error.message}`;
            });
    }

    function displayWeatherData(data) {
        const cityName = data.name;
        const temperature = (data.main.temp - 273.15).toFixed(2); 
        const weatherDescription = data.weather[0].description;
        const icon = data.weather[0].icon;

        const weatherHTML = `
            <h2>${cityName}</h2>
            <p>Temperature: ${temperature}°C</p>
            <p>Weather: ${weatherDescription}</p>
            <img src="https://openweathermap.org/img/w/${icon}.png" alt="Weather Icon">
        `;

        weatherData.innerHTML = weatherHTML;
    }
});
