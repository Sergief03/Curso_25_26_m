import { imagesData } from "../data/images";

export function creaetImageCard(image,onImageClick,onFavoriteToggle){
    //Contenedor principal
    const card=document.createElement("div");

    card.className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group relative";

    card.dataset.imageId=image.id;

    const img=document.createElement("img");
    img.src=image.url;
    img.alt=image.title;
    img.className="w-full h-64 object-cover group-hover:opacity-90 transition-opacity";
    // img.onerror=()=>img.src="imagen no disponible";

    card.appendChild(img);



    card.appendChild(img);

    //gestionar el corazon de favorito


    //informacion de la imagen 
    const infoContainer=document.createElement("div");
    infoContainer.className="p-4 bg-white ";

    const title=document.createElement("h3");
    title.className="text-lg font-bold text-gray-800 mb-2";
    title.textContent=image.title;

    const author=document.createElement("p");
    author.className="font-semibold text-sm text-gray-600";
    author.textContent=image.author;


    infoContainer.appendChild(title);
    infoContainer.appendChild(author);

    card.appendChild(infoContainer);


    card.onclick=()=>{
        alert(image.id);//sustituir por onImageClick
    }

    return {
        element:card,
        //aqui iran las funciones
        //isfavorite:()=>{}    es fav la imagen
        //setFavortie  convertir a fav esta imagen 
    }
}

export function createImageGrid(images, onImageClick, onFavoriteToggle){
    //creamos un map privado que guarde las tarjetas

    const cards= new Map();

    const grid=document.createElement("div");
    grid.className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6";

    images.forEach(image=>{
        const cardComponent=creaetImageCard(image,onImageClick,onFavoriteToggle);
        cards.set(image.id,cardComponent.element);
    });

    grid.append(...cards.values())

    return {
        element:grid,
        //aqui iran las funciones
        //isfavorite:()=>{}    es fav la imagen
        //setFavortie  convertir a fav esta imagen 
    }
}

export default createImageGrid