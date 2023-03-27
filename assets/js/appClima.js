// API weather

const api = {
    key: '11acf7339ac8e05057ffed34015f141d',
    url: `https://api.openweathermap.org/data/2.5/weather`
  };
  
  const tarjeta =document.getElementById('weatherCard')

  const city = document.getElementById('city');
  const date = document.getElementById('date');
  const tempImg = document.getElementById('temp-img');
  const temperatura = document.getElementById('temperatura');
  const weather = document.getElementById('weather');
  const range = document.getElementById('range');
  
  function updateImage(data) {
    const temperatura = toCelcius(data.main.temp);
    let src = 'assets/icons/clima.png';
    if (temperatura > 26) {
        src = 'assets/icons/caliente.png';
    } else if (temperatura < 20) {
        src = 'assets/icons/baja-temperatura.png';
    }
    tempImg.src = src;
  }

  async function search(query){
    try {
      const response = await fetch(`${api.url}?q=${query}&appid=${api.key}&lang=es`);
      const data = await response.json();
      tarjeta.style.display = 'block';
      city.innerHTML = `${data.name}, ${data.sys.country}`;
      data.date = (new Date()).toLocaleDateString();
      temperatura.innerHTML = `${toCelcius(data.main.temp)}°C`;
      weather.innerHTML = data.weather[0].description;
      range.innerHTML = `${toCelcius(data.main.temp_min)}°C / ${toCelcius(data.main.temp_max)}°C`
      updateImage(data);
    } catch(err){
      console.log(err)
    }
  }

  function toCelcius(kelvin) {
    return Math.round(kelvin - 273.15);
  }

  function onSubmit(event) {
    event.preventDefault();
    search(searchbox.value);
  }
  
  const searchform = document.getElementById('search-formulario');
  const searchbox = document.getElementById('searchbox');
  searchform.addEventListener('submit', onSubmit, true);
  
  //https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}