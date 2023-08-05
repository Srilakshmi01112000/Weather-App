document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('cityInput');
    const addCityBtn = document.getElementById('addCityBtn');
    const weatherCardsContainer = document.getElementById('weatherCards');
    const cities = [];

    async function fetchWeatherData(cityName) {
        const apiKey = '912e15b2e7777666488f48c024f75f83';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching weather data:', error);
            return null;
        }
    }

    function addCity() {
        const cityName = cityInput.value.trim();
        if (cityName === '') {
            return;
        }

        if (cities.some(city => city.name.toLowerCase() === cityName.toLowerCase())) {
            alert('City already added.');
            return;
        }

        fetchWeatherData(cityName)
            .then(weatherData => {
                if (weatherData) {
                    cities.push(weatherData);
                    cities.sort((a, b) => a.main.temp - b.main.temp);
                    renderWeatherCards();
                }
            });

        cityInput.value = '';
    }
   

    function renderWeatherCards() {
        weatherCardsContainer.innerHTML = '';

        cities.forEach(city => {
            const card = document.createElement('div');
            card.classList.add('weather-card');

            const highTemp = Math.floor(city.main.temp_max);
            const lowTemp = Math.floor(city.main.temp_min);

        
            let weatherImgString;
            if (city.weather[0].main == "Clouds") 
            {
                weatherImgString = "images/Big/clouds.png";
                
            } 
            if(city.weather[0].main == "Clear") 
            {
                weatherImgString = "images/Big/clear-sky.png";
            } 
            if(city.weather[0].main == "Haze") 
            {
                weatherImgString = "images/Big/Moon cloud fast wind.png";
            } 
            if(city.weather[0].main == "Rain") 
            {
                weatherImgString = "images/Big/Sun cloud angled rain.png";
            } 
            if(city.weather[0].main == "Drizzle") 
            {
                weatherImgString = "images/Big/Moon cloud mid rain.png";
            } 
            if (city.weather[0].main == "Mist") 
            {
                weatherImgString = "images/Big/unknown.png";
            }
        
            const weatherDetails = document.createElement('div');
            weatherDetails.innerHTML = `
                <div class="container-box">
                <div class="left">
                <p class="temp">${Math.floor(city.main.temp)}°C</p>
                <div class="high-low" style="display-flex">
                <p class="high-low">H:${highTemp}°C L:${lowTemp}°C</p>
                </div>
                <p class="cityname">${city.name}, ${city.sys.country}</p>
                </div>
                <div class="right"> 
                <img src="${weatherImgString}" >
                <p class="weather">${city.weather[0].description}</p>
                </div>
                </div> 
                    
                `;
            card.appendChild(weatherDetails);

            weatherCardsContainer.appendChild(card);
        });
    }

    addCityBtn.addEventListener('click', addCity);
})
    
    
    


































    // const apiKey = '912e15b2e7777666488f48c024f75f83';
    // const addCityBtn = document.getElementById('addCityBtn');
    // const cityInput = document.getElementById('cityInput');
    // const weatherCards = document.getElementById('weatherCards');
    // const cities = [];

    // async function addCity() {
    //     const cityName = cityInput.value.trim();
        
    //     if (cityName === '') {
    //       return;
    //     }
        
    //     // Check for duplicate city
    //     if (cities.some(city => city.name.toLowerCase() === cityName.toLowerCase())) {
    //       alert('City already added.');
    //       return;
    //     }   
    
    //     const weatherData = await fetchWeather(cityName);
        
    //     if (weatherData) {
    //       cities.push(weatherData);
    //       cities.sort((a, b) => a.main.temp - b.main.temp);
    //       renderWeatherCards();
    //     }
        
    //     cityInput.value = '';
    //   }
    // // addCityBtn.addEventListener('click', () => {
    // //     const cityName = cityInput.value.trim();
    // //     if (cityName) {
    // //         if (!cities.includes(cityName)) {
    // //             fetchWeather(cityName);
    // //         } else {
    // //             alert('City already added.');
    // //         }
    // //     } else {
    // //         alert('Please enter a city name.');
    // //     }
    // //     cityInput.value = '';
    // // });

    // async function fetchWeather(cityName) {
    //     try {
    //         const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
    //         const data = await response.json();
    //         cities.push(cityName);
    //         renderWeatherCard(data);
    //     } catch (error) {
    //         console.error('Error fetching weather data:', error);
    //     }
    // }
    // function getWeatherIcon(weatherCondition) {
    //     switch (weatherCondition) {
    //         case 'Clear':
    //             return 'images/Big/clear-sky.png';
    //         case 'Clouds':
    //             return 'images/Big/clouds.png';
    //         case 'wind':
    //         case 'fast wind':
    //             return 'images/Big/Moon cloud fast wind.png';
    //         case 'Rain':
    //         case 'Drizzle':
    //         case 'Thunderstorm':
    //             return 'images/Big/Moon cloud mid rain.png';
    //         case 'showers':
    //             return 'images/Big/Sun cloud angled rain.png';
    //         case 'Mist':
    //         case 'Smoke':
    //         case 'Haze':
    //         case 'Dust':
    //         case 'Fog':
    //         case 'Sand':
    //         case 'Ash':
    //         case 'Squall':
    //         case 'Tornado':
    //             return 'images/Big/Tornado.png';
    //         default:
    //             return 'images/Big/unknown.png';
    //     }
    // }
    // function renderWeatherCard(data) {
    //     const weatherCard = document.createElement('div');
    //     weatherCard.classList.add('weather-card');

    //     const weatherIcon = document.createElement('img');
    //     weatherIcon.classList.add('weather-icon');
    //     const iconFileName = getWeatherIcon(data.weather[0].main);
    //     // weatherIcon.src = `images/${iconFileName}`;
    //     weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    //     const weatherDetails = document.createElement('div');
    //     weatherDetails.innerHTML = `
    //     <div class="container-box">
    //        <div class="left">
    //        <p class="temp">${data.main.temp}°C</p>
    //        <div class="high-low" style="display-flex">
    //        <p class="high">H:${highTemp}°C</p>
    //        <p class="low">L:${lowTemp}°C</p>
    //        </div>
    //        <h2>${data.name}, ${data.sys.country}</h2>
    //        </div>
    //        <div class="right">
    //        <img src="weatherIcon.src">
    //        <p class="weather">${data.weather[0].description}</p>
    //        </div>
    //        </div> 
            
    //     `;

    //     weatherCard.appendChild(weatherIcon);
    //     weatherCard.appendChild(weatherDetails);
    //     weatherCards.appendChild(weatherCard);

    //     // Sort cities by temperature
    //     cities.sort((city1, city2) => getTemperature(city1) - getTemperature(city2));
    // }

    // function getTemperature(cityName) {
    //     const weatherCard = Array.from(weatherCards.children).find(card => card.querySelector('h2').textContent === cityName);
    //     if (weatherCard) {
    //         return parseFloat(weatherCard.querySelector('p:nth-child(2)').textContent.split(':')[1]);
    //     }
    //     return 0;
    // }
    // addCityBtn.addEventListener('click', addCity);