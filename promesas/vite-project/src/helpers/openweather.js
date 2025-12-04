const VITE_API_URL_WEATHER = import.meta.env.VITE_API_URL_WEATHER;
const VITE_API = import.meta.env.VITE_API;

export function getWeatherPromise(city) {
  const URL = `${VITE_API_URL_WEATHER}?q=${city}&appid=${VITE_API}&units=metric`;

  //peticion una api de openweather
  return fetch(URL).then((response) => {
    if (!response.ok) {
      throw new Error("Error al traer la data del clima");
    }
    return response.json();
  })
    .then((data) => {
      console.log("------- Weather Data (Promise) -------");
      console.log(`La temperatura en ${city} es de ${data.main.temp} °C`);
      const arrayImg=['🌞','🌤️','☁️','🌧️'];
      const weather=data.weather[0].main;
      switch(weather){
        case 'Clear':
          console.log(arrayImg[0]);
            break;
        case 'Clouds':
          console.log(arrayImg[2]);
            break;
        case 'Rain':
          console.log(arrayImg[3]);
            break;
        case 'Drizzle':
          console.log(arrayImg[4]);
            break;
        }
        return data;
    })
    .catch((error) => {
      console.log("Error....", error);
    })
    .finally(() => {
      console.log("------- Weather Data (Promise) -------");
    });
}
