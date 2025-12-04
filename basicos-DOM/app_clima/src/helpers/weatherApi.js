/*
    Crear una funcion llama de getWeatherByCity(cityName) que devuelva una data en json de la api de clima.
    Crear una funcion llamada parseWeatherData(data) que devuelva:
    - La ciudad
    - El pais
    - La temperatura
    - La humedad
    - El viento
    - La descripcion
*/

const VITE_URL_DATA=import.meta.env.VITE_URL_DATA;
const VITE_API=import.meta.env.VITE_API;
const VITE_API_URL_WEATHER=import.meta.env.VITE_API_URL_WEATHER;


export const getWeatherByCity = async (cityName) => {
    try{
        const URL = `${VITE_API_URL_WEATHER}?q=${cityName}&appid=${VITE_API}&units=metric`;
        const response = await fetch(URL);
        const data = await response.json();
        return data;
    }catch(error){
        console.error(error);
    }
};

export const parseWeatherData = (data) => {

    return {
        city: data.name,
        country: data.sys.country,
        temp: data.main.temp,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        description: data.weather[0].description
    };
};