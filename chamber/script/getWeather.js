const currentTemp = document.querySelector('#current-temp');
const temp1 = document.querySelector('#temp1');
const temp2 = document.querySelector('#temp2');
const temp3 = document.querySelector('#temp3');
const weatherIcon = document.querySelector('#weather-icon');
const icon1 = document.querySelector('#weather-icon1');
const icon2 = document.querySelector('#weather-icon2');
const icon3 = document.querySelector('#weather-icon3');
const captionDesc = document.querySelector('#figcaption');
const desc1 = document.querySelector('#figcaption1');
const desc2 = document.querySelector('#figcaption2');
const desc3 = document.querySelector('#figcaption3');
const url = 'https://api.openweathermap.org/data/3.0/onecall?lat=5.473368253538019&lon=7.081021564406769&units=metric&appid=4943c402bc529c51e5747e2b9205ed55';

async function apiFetch(url) {
    try {
        const response = await fetch(url);
       if (response.ok) {
        const data = await response.json();
        displayResults(data);
       }
       else {
        throw Error(await response.text());
       }
    }
    catch (error) {
        console.log(error);
    }
}

function displayResults(data) {
  currentTemp.innerHTML = `~  ${data.current.temp}&deg;C`;
  const iconsrc = `https://openweathermap.org/img/w/${data.current.weather[0].icon}.png`;
  let descrip = data.current.weather[0].description;
  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', 'weather icon');
  weatherIcon.setAttribute('width', '40');
  weatherIcon.setAttribute('height', '40');
  captionDesc.textContent = `${descrip} ~  `;

  temp1.innerHTML = `~  ${data.daily[1].temp.day}&deg;C`;
  const iconsrc1 = `https://openweathermap.org/img/w/${data.daily[1].weather[0].icon}.png`;
  let descrip1 = data.daily[1].weather[0].description;
  icon1.setAttribute('src', iconsrc1);
  icon1.setAttribute('alt', 'weather icon');
  icon1.setAttribute('width', '40');
  icon1.setAttribute('height', '40');
  desc1.textContent = `${descrip1} ~  `;

  temp2.innerHTML = `~  ${data.daily[2].temp.day}&deg;C`;
  const iconsrc2 = `https://openweathermap.org/img/w/${data.daily[2].weather[0].icon}.png`;
  let descrip2 = data.daily[2].weather[0].description;
  icon2.setAttribute('src', iconsrc2);
  icon2.setAttribute('alt', 'weather icon');
  icon2.setAttribute('width', '40');
  icon2.setAttribute('height', '40');
  desc2.textContent = `${descrip2} ~  `;

  temp3.innerHTML = `~  ${data.daily[3].temp.day}&deg;C`;
  const iconsrc3 = `https://openweathermap.org/img/w/${data.daily[3].weather[0].icon}.png`;
  let descrip3 = data.daily[3].weather[0].description;
  icon3.setAttribute('src', iconsrc3);
  icon3.setAttribute('alt', 'weather icon');
  icon3.setAttribute('width', '40');
  icon3.setAttribute('height', '40');
  desc3.textContent = `${descrip3} ~  `;
}

apiFetch(url);