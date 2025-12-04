import { peliculas } from "../db/data";

const VITE_URL_DATA=import.meta.env.VITE_URL_DATA;

export async function createEjercicio3() {
  fetch(`${VITE_URL_DATA}peliculas`)
  .then(response=>response.json())
  .then(data=>{
    const app=document.getElementById('app');

    const containerPelicula=document.createElement('div');
    containerPelicula.classList.add('movies-container');
    data.forEach(element => {
        const card=document.createElement('div');
        card.classList.add('movie-card');

        const imageContainer=document.createElement('div');
        imageContainer.className="flex justify-center"


        const image=document.createElement('img');
        image.className='w-32 h-auto';
        image.src=element.imagen;

        imageContainer.appendChild(image);

        const title=document.createElement('h2');
        title.classList.add('movie-title');
        title.textContent=element.titulo;  

        const year=document.createElement('p');
        year.classList.add('movie-year');
        year.textContent=element.año;

        const rating=document.createElement('p');
        rating.classList.add('movie-rating');

        const numeroEstrellas=Math.floor(element.rating/10*5);
        const estrellas='★'.repeat(numeroEstrellas)+'☆'.repeat(5-numeroEstrellas);

        rating.textContent=estrellas+' '+element.rating;

        card.append(imageContainer,title,year,rating);
        containerPelicula.appendChild(card);

        app.appendChild(containerPelicula);

        return {
            element:containerPelicula
        }
    });
  })
  .catch(error=>console.error(error.message));
}

export function createEjercicio3SinFetch() {
  
    const app=document.getElementById('app');
    const data=peliculas;

    const containerPelicula=document.createElement('div');
    containerPelicula.classList.add('movies-container');
    data.forEach(element => {
        const card=document.createElement('div');
        card.classList.add('movie-card');

        const title=document.createElement('h2');
        title.classList.add('movie-title');
        title.textContent=element.titulo;  

        const year=document.createElement('p');
        year.classList.add('movie-year');
        year.textContent=element.año;

        const rating=document.createElement('p');
        rating.classList.add('movie-rating');

        const numeroEstrellas=Math.floor(element.rating/10*5);
        const estrellas='★'.repeat(numeroEstrellas)+'☆'.repeat(5-numeroEstrellas);



        rating.textContent=estrellas+' '+element.rating;

        card.append(title,year,rating);
        containerPelicula.appendChild(card);

        app.appendChild(containerPelicula);

        return {
            element:containerPelicula
        }
    });
  
}


