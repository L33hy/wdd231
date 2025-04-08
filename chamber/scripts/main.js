document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('#hamburger');
    const navbar = document.querySelector('#navbar');

    hamburger.addEventListener('click', function() {
        navbar.classList.toggle('open');    
        if (navbar.classList.contains('open')) {
            // navbar.classList.add('open');
            hamburger.textContent = 'X';
        } else {
            hamburger.textContent = '☰';
            // navbar.classList.remove('open');
        }
    });

    async function getWeather() {
        const apiKey = '278286a1cca556be7de32b0aa2f565ea'; // Replace with your actual API key from OpenWeatherMap
        const location = 'kaduna,NG'; // Specify the location (Kaduna, Nigeria)
        const units = 'imperial'; // Use Fahrenheit

        const currentWeatherContainer = document.querySelector('.current-weather');
        const forecastContainer = document.querySelector('.forecast');

        try {
            // Fetch current weather
            const currentWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=${units}`);
            const currentWeatherData = await currentWeatherResponse.json();

            // Fetch 3-day forecast
            const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=${units}`);
            const forecastData = await forecastResponse.json();

            // Display current weather
            const { name, main, weather, sys } = currentWeatherData;
            const icon = weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/w/${icon}.png`;
            const sunriseTime = new Date(sys.sunrise * 1000).toLocaleTimeString();
            const sunsetTime = new Date(sys.sunset * 1000).toLocaleTimeString();

            currentWeatherContainer.innerHTML = `
                <div class="weather-icon-temp">
                    <img src="${iconUrl}" alt="${weather[0].description}" class="weather-icon">
                    <p class="temp">${main.temp}°F</p>
                </div>
                <div class="weather-des">
                    <p class="weather-description">${weather[0].description} <span class="location-name">${name}</span></p>
                </div>
                <p class="weather-info">High: <span class="high-temp">${main.temp_max}°F</span></p>
                <p class="weather-info">Low: <span class="low-temp">${main.temp_min}°F</span></p>
                <p class="weather-info">Humidity: <span class="humidity">${main.humidity}%</span></p>
                <p class="weather-info">Sunrise: <span class="sunrise">${sunriseTime}</span></p>
                <p class="weather-info">Sunset: <span class="sunset">${sunsetTime}</span></p>
            `;

            // Display 5-day forecast
            let forecastHTML = '<h3 class="forecast-title">5-Days Forecast</h3>';
            // Filter the forecast data to get daily forecasts (around noon)
            const dailyForecasts = forecastData.list.filter(item => item.dt_txt.includes('12:00:00'));

            dailyForecasts.forEach(day => {
                const date = new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'long', month: '2-digit', day: '2-digit', year: 'numeric' });
                const { temp_max, temp_min } = day.main;
                const dayName = date.split(',')[0];
                const formattedDate = date.split(',')[1];

                forecastHTML += `
                    <div class="forecast-item">
                        <span class="day-name">${dayName}</span><span class="date-style">${formattedDate}</span>: <span class="forecast-temp">${temp_max}°F</span>
                    </div>
                `;
            });
            forecastContainer.innerHTML = forecastHTML;

        } catch (error) {
            console.error('Error fetching weather data:', error);
            currentWeatherContainer.innerHTML = '<p>Failed to load weather data.</p>';
            forecastContainer.innerHTML = '<p>Failed to load weather forecast.</p>';
        }
    }

    // Call the function when the page loads
    getWeather();
});

