/*
    Ejercicio 1
    Crear una aplicacion que consulta el clima constituida por 6 elementos subdivididos en un header un footer y un main. El header y el footer se construyen utilizando los elementos que hemos visto del DOM. El main esta subdividido en 3 componentes que son la search card la weather card y la favorites card.
    El componente search se encarga de buscar dentro de la api la ciudad que queramos.
    Ejemplificar el uso de un almacenamiento con map el localstorage
    El componente weather card dispondremos de un array de 15 imagenes almacenadas en el public con las diferentes estados climatologicos posibles.
    La tarjeta favorite card almacenara las ciudades o tarjetas favoritas.
    Para hacer favorita una ciudad bastas con dar dos click de raton y automaticamente se guardara en la card de favoritos.
    Para sacar una tarjeta de las favoritas, boton derecho y que saca una confirmacion de sacar o no.
    
    
    Ejercicio 2
    Crear un sistema booking de gestion de reservas que permita ejemplificar la reserva en un hotel.
    El sistema tendra la siguiente interfaz donde tenemos un header que sera el nombre de la empresa, y luego habra un main compuesto por:
    - Un desplegable, donde puedas seleccionar de una api privada montada con json-server las ciudades disponibles.
    - Dos input date, check in y check out, donde el check out no puede ser menor que el check in.
    - Numero de huespedes 
    Automaticamente me mostrara utilizando un componente card hotel, todos aquellos hoteles que tengan disponibilidad en el rango de fechas indicados. 
    Cuando le de un click a la tarjeta automaticamente se añadira en un componente carrito reserva la informacion de el hotel, el numero de personas, el numero de estrellas y el total a pagar.
    El total a pagar es igual al numero de huespedes por el precio de la habitacion que tiene el hotel
    Desglosar el iva.
    Finalizar reserva resetea todo
    Persistencia.
*/

const VITE_URL_DATA=import.meta.env.VITE_URL_DATA;
const VITE_API=import.meta.env.VITE_API;
const VITE_API_URL_WEATHER=import.meta.env.VITE_API_URL_WEATHER;



export function createWeatherApp() {

    const cache = new Map();
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // ---------------- HEADER ----------------
    const createHeader = () => {
        const header = document.createElement('header');
        header.classList.add('header');

        const title = document.createElement('h1');
        title.textContent = 'Weather App';

        header.appendChild(title);
        return header;
    };

    // ---------------- FOOTER ----------------
    const createFooter = () => {
        const footer = document.createElement('footer');
        footer.classList.add('footer');

        const p = document.createElement('p');
        p.textContent = '© 2025 Weather App';

        footer.appendChild(p);
        return footer;
    };

    // ------------ WEATHER CARD -------------
    const createWeatherCard = (weather) => {
        const card = document.createElement('div');
        card.classList.add('weather-card');

        const title = document.createElement('h2');
        title.textContent = weather.name;

        const temp = document.createElement('p');
        temp.textContent = `🌡 Temperatura: ${weather.main.temp}°C`;

        const desc = document.createElement('p');
        desc.textContent = `☁: ${weather.weather[0].description}`;

        const icon = document.createElement('img');
        icon.classList.add('weather-icon');
        // Ahora usa iconos oficiales de OpenWeather
        icon.src = getIcon(weather.weather[0].icon);
        icon.alt = weather.weather[0].description;

        card.append(title, icon, temp, desc);

        // doble click -> favorito
        card.addEventListener('dblclick', () => {
            if (!favorites.includes(weather.name)) {
                favorites.push(weather.name);
                localStorage.setItem('favorites', JSON.stringify(favorites));
                renderFavorites();
            }
        });

        return card;
    };

    // ----------- FAVORITES CARD -----------
    const createFavoritesCard = () => {
        const favContainer = document.createElement('div');
        favContainer.classList.add('favorites-card');

        const title = document.createElement('h2');
        title.textContent = 'Favoritos';

        const list = document.createElement('ul');
        list.id = 'favorites-list';

        favContainer.append(title, list);
        return favContainer;
    };

    const renderFavorites = () => {
        const list = document.getElementById('favorites-list');
        list.innerHTML = '';

        favorites.forEach(city => {
            const li = document.createElement('li');
            li.textContent = city;

            // botón derecho para eliminar
            li.addEventListener('contextmenu', (event) => {
                event.preventDefault();
                const confirmDelete = confirm(`¿Eliminar "${city}" de favoritos?`);

                if (confirmDelete) {
                    const index = favorites.indexOf(city);
                    favorites.splice(index, 1);
                    localStorage.setItem('favorites', JSON.stringify(favorites));
                    renderFavorites();
                }
            });

            list.appendChild(li);
        });
    };

    // ---------- SEARCH CARD ----------
    const createSearchCard = () => {
        const container = document.createElement('div');
        container.classList.add('search-card');

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Introduce una ciudad...';

        const button = document.createElement('button');
        button.textContent = 'Buscar';

        const results = document.createElement('div');
        results.id = 'weather-result';

        button.addEventListener('click', async () => {
            const city = input.value.trim();
            if (!city) return alert('Escribe una ciudad');

            const weather = await fetchWeather(city);
            if (weather) {
                results.innerHTML = '';
                results.appendChild(createWeatherCard(weather));
            }
        });

        container.append(input, button, results);
        return container;
    };

    // -------- FETCH CLIMA + CACHE MAP --------
    const fetchWeather = async (city) => {
        if (cache.has(city)) return cache.get(city);

        const URL = `${VITE_API_URL_WEATHER}?q=${city}&appid=${VITE_API}&units=metric`;

        try {
            const res = await fetch(URL);
            const data = await res.json();

            if (data.cod !== 200) {
                alert('Ciudad no encontrada');
                return null;
            }

            cache.set(city, data);
            return data;

        } catch (err) {
            console.error(err);
            alert('Error de conexión');
        }
    };

    // ----------- ICONOS CLIMA -----------
    const getIcon = (iconCode) => {
        // iconCode viene de la API: ejemplo "01d", "10n", etc
        return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    };

    // ---------------- RENDER ----------------
    const render = () => {
        const app = document.getElementById('app');
        app.innerHTML = '';

        const header = createHeader();
        const search = createSearchCard();
        const favoritesCard = createFavoritesCard();
        const footer = createFooter();

        app.append(header, search, favoritesCard, footer);

        renderFavorites();
    };

    return { render };
}
    


export function createEjercicio12() {

    const carritoReserva = async (hotel, guests) => {
        const carritoContainer = document.getElementById('carrito') ?? document.createElement('div');
        carritoContainer.id = 'carrito';

        carritoContainer.innerHTML = ''; // limpia antes

        const title = document.createElement('h2');
        title.textContent = 'Carrito de reserva';

        const precio = hotel.pricePerNight * guests;
        const iva = precio * 0.21;

        const pPrecio = document.createElement('p');
        pPrecio.textContent = `Precio: ${precio}€`;

        const pIVA = document.createElement('p');
        pIVA.textContent = `IVA: ${iva.toFixed(2)}€`;

        carritoContainer.append(title, pPrecio, pIVA);

        document.getElementById('app').appendChild(carritoContainer);

        return {
            carritoContainer,
        }
    };



    const createCardHotel = async (checkin, checkout, guests) => {
        const response = await fetch(`${VITE_URL_DATA}hoteles`);
        const data = await response.json();

        const viejo = document.getElementById('card-container');
        if (viejo) viejo.remove();

        const cardContainer = document.createElement('div');
        cardContainer.id = 'card-container';
        cardContainer.classList.add('card-container');

        const resetBusqueda = () => {
            const form = document.querySelector('.form');
            const cardContainer = document.getElementById('card-container');

            // Resetea formulario
            form.reset();

            // Borra contenedor de hoteles si existe
            if (cardContainer) cardContainer.remove();
        };

        data.hotels
            .filter(hotel => hotel.availability.some(a => a.checkIn <= checkin && a.checkOut >= checkout))
            .forEach(hotel => {

                const cardHotel = document.createElement('div');
                cardHotel.classList.add('card-hotel');

                cardHotel.innerHTML = `
                    <h2>${hotel.name}</h2>
                    <p>${hotel.cityId}</p>
                    <p>${'★'.repeat(hotel.stars)}${'☆'.repeat(5 - hotel.stars)}</p>
                    <p>${hotel.pricePerNight}€/noche</p>
                    <button>Reservar</button>
                `;

                const btn = cardHotel.querySelector('button');

                btn.addEventListener('click', () => {
                    carritoReserva(hotel, guests);
                    resetBusqueda();
                });

                cardContainer.appendChild(cardHotel);
            });

        document.getElementById('app').appendChild(cardContainer);

        return {
            cardContainer,
        }
    };

    

    const createForm = async () => {
        const form = document.createElement('form');
        form.classList.add('form');

        const select = document.createElement('select');
        select.classList.add('form-select');

        const response = await fetch(`${VITE_URL_DATA}hoteles`);
        const data = await response.json();

        data.cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city.name;
            option.textContent = city.name;
            select.appendChild(option);
        });

        const inputCheckIn = document.createElement('input');
        inputCheckIn.type = 'date';
        inputCheckIn.classList.add('form-input');

        const inputCheckOut = document.createElement('input');
        inputCheckOut.type = 'date';
        inputCheckOut.classList.add('form-input');

        inputCheckIn.addEventListener('change', () => {
            if (inputCheckIn.value) {
                inputCheckOut.min = inputCheckIn.value;
                if (inputCheckOut.value && inputCheckOut.value < inputCheckIn.value) {
                    inputCheckOut.value = inputCheckIn.value;
                }
            }
        });

        const inputGuests = document.createElement('input');
        inputGuests.type = 'number';
        inputGuests.classList.add('form-input');

        const button = document.createElement('button');
        button.type = 'submit';
        button.classList.add('form-button');
        button.textContent = 'Buscar';

        form.appendChild(select);
        form.appendChild(inputCheckIn);
        form.appendChild(inputCheckOut);
        form.appendChild(inputGuests);
        form.appendChild(button);

        const inputs = [select, inputCheckIn, inputCheckOut, inputGuests]; // array directo

        // Función para buscar automáticamente cuando todos los campos tienen valor
        function checkFormComplete() {
            const allFilled = inputs.every(i => i.value !== '');

            if (allFilled) {
                createCardHotel(inputCheckIn.value, inputCheckOut.value, inputGuests.value);
            }
        }

        inputs.forEach(input => {
            input.addEventListener('input', checkFormComplete);
            input.addEventListener('change', checkFormComplete);
        });

        button.addEventListener('click', (event) => {
            event.preventDefault();
            createCardHotel(inputCheckIn.value, inputCheckOut.value, inputGuests.value);
        });

        const app = document.getElementById('app');
        app.appendChild(form);

        return { form };
    };

    const render=()=>{
        const app=document.getElementById('app');
        const form=createForm();
    }

    return {render};
}


