const searchBtn =  document.querySelector('#searchBtn');
const searchField = document.querySelector('#searchByCity');
const loc = document.querySelector('#location');
const desc = document.querySelector('#desc');
const temp = document.querySelector('#temp');
const hum = document.querySelector('#humidity');
const speed = document.querySelector('#speed');
const wIcon = document.querySelector('#weatherIcon');

document.querySelector('#errorMsg').style.display = 'none';


const apiKey = '403b60280b23897798c58a86b03fdb77';

const getCity = async(event) => {
    event.preventDefault();
    const cityName = searchField.value;

    if(cityName) {
        try {
            const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
            const response = await fetch(weatherURL);
            const data = await response.json();
            buildUI(data);
            searchField.value = '';
        } catch {
            document.querySelector('#weatherContainer').style.display = 'none';
            document.querySelector('#errorMsg').style.display = 'block';
            document.querySelector('#errorMsg').innerHTML = 'Enter the correct city name';
            console.log('Enter right city name');
        }
    }
};

const buildUI = (data) => {
    document.querySelector('#errorMsg').style.display = 'none';
    document.querySelector('#weatherContainer').style.display = 'block';
    loc.innerHTML = `${data.name}, ${data.sys.country}`;
    desc.innerHTML = `${data?.weather[0]?.description}`;
    temp.innerHTML = `${Math.round(data?.main?.temp)}`;
    hum.innerHTML = `${data?.main?.humidity}`;
    speed.innerHTML = `${data?.wind?.speed}`;

    const {main} = data.weather[0];

    if(main?.toLowerCase() === 'clouds' || main?.toLowerCase() === 'mist') {
        wIcon.classList.add('full-clouds');
    } else if (main?.toLowerCase() === 'rain' || main?.toLowerCase() === 'drizzle') {
        wIcon.classList.add('full-rain');
    } else if (main?.toLowerCase() === 'clear') {
        wIcon.classList.add('full-clear');
    }
}

searchBtn.addEventListener('click', getCity);
