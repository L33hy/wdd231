// weather.js
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerButton = document.querySelector('.hamburger-button');
    const navLinks = document.querySelector('.nav-links');
    const weatherContainer = document.getElementById('weather-container');
    const apiKey = '278286a1cca556be7de32b0aa2f565ea'; // Replace with your actual API key
    const city = 'Abuja'; // You can make this dynamic based on user location

    // Responsive Navigation
    hamburgerButton.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
        });
    });
    
    // Function to fetch weather data
    async function fetchWeatherData() {
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            storeWeatherData(data);
            displayWeatherData();
        } catch (error) {
            console.error('Error fetching weather data:', error);
            weatherContainer.innerHTML = '<p>Failed to load weather data.</p>';
        }
    }

    // Function to store weather data in localStorage
    function storeWeatherData(weatherData) {
        try {
            localStorage.setItem('weatherData', JSON.stringify(weatherData));
            localStorage.setItem('weatherDataTimestamp', Date.now());
        } catch (error) {
            console.error('Error storing weather data in localStorage:', error);
        }
    }

    // Function to retrieve weather data from localStorage
    function getWeatherDataFromStorage() {
        const storedData = localStorage.getItem('weatherData');
        const timestamp = localStorage.getItem('weatherDataTimestamp');

        if (storedData && timestamp) {
            // Check if the stored data is recent (e.g., within the last hour)
            const now = Date.now();
            const oneHour = 60 * 60 * 1000; // milliseconds in an hour
            if (now - parseInt(timestamp) < oneHour) {
                return JSON.parse(storedData);
            }
        }
        return null;
    }

    // Function to display weather data
    function displayWeatherData() {
        weatherContainer.innerHTML = ''; // Clear any previous content
        const storedWeather = getWeatherDataFromStorage();

        if (storedWeather && storedWeather.list) {
            // Filter data for current day and the next two days
            const today = new Date().toLocaleDateString();
            const forecastDays = {};

            storedWeather.list.forEach(item => {
                const forecastDate = new Date(item.dt * 1000).toLocaleDateString();
                if (forecastDate === today ||
                    forecastDate === new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleDateString() ||
                    forecastDate === new Date(new Date().setDate(new Date().getDate() + 2)).toLocaleDateString()) {
                    if (!forecastDays[forecastDate]) {
                        forecastDays[forecastDate] = [];
                    }
                    forecastDays[forecastDate].push(item);
                }
            });

            for (const day in forecastDays) {
                // Use the most relevant forecast for the day (e.g., midday)
                const middayForecast = forecastDays[day].reduce((prev, curr) => {
                    const prevTime = new Date(prev.dt * 1000).getHours();
                    const currTime = new Date(curr.dt * 1000).getHours();
                    return Math.abs(currTime - 12) < Math.abs(prevTime - 12) ? curr : prev;
                }, forecastDays[day][0]); // Default to the first item

                if (middayForecast) {
                    const date = new Date(middayForecast.dt * 1000);
                    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
                    const temperature = Math.round(middayForecast.main.temp);
                    const description = middayForecast.weather[0].description;
                    const iconCode = middayForecast.weather[0].icon;
                    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

                    const weatherCard = document.createElement('div');
                    weatherCard.classList.add('weather-card');
                    weatherCard.innerHTML = `
                        <h3>${dayName}</h3>
                        <img src="${iconUrl}" alt="${description}">
                        <p class="temperature">${temperature}°C</p>
                        <p class="description">${description}</p>
                    `;
                    weatherContainer.appendChild(weatherCard);
                }
            }
        } else {
            weatherContainer.innerHTML = '<p>No weather data available.</p>';
        }
    }

    // Initial fetch and display
    const storedWeather = getWeatherDataFromStorage();
    if (storedWeather) {
        displayWeatherData();
    } else {
        fetchWeatherData();
    }
});