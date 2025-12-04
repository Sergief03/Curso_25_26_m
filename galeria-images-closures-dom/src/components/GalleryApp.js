import { imagesData } from "../data/images";
import createImageGrid from "./ImageCard";

export default function createGalleryApp() {
    // Contenedor principal
    const container = document.createElement('div');
    container.className = 'min-h-screen bg-linear-to-br from-purple-300 via-white to-pink-300';

    // Header
    const header=document.createElement('header');
    header.className='bg-white shadow-lg sticky top-0 z-40';
    const headerContent=document.createElement('div');
    headerContent.className="max-w-7xl mx-auto px-6 py-6";

    const headerTitle=document.createElement('h1');
    headerTitle.className="text-3xl font-bold text-purple-800 mb-2";
    headerTitle.textContent="🎨 Galeria de imagenes";

    const headerSubtitle=document.createElement('p');
    headerSubtitle.className="text-gray-600";
    headerSubtitle.textContent="Aprende Closures, funciones fabrica y manipulacion del DOM";

    headerContent.appendChild(headerTitle);
    headerContent.appendChild(headerSubtitle);
    header.appendChild(headerContent);

    // Main
    const main=document.createElement('main');
    main.className='max-w-7xl mx-auto px-6 py-8';

    const counterComponent=document.createElement("h2");
    counterComponent.textContent="Aqui ira el componente favoritesCounter"

    const imageModal=document.createElement("h2");
    imageModal.textContent="Aqui ira el componente imageModal"

    const gridComponent=document.createElement("h2");
    gridComponent.textContent="Aqui ira el componente gridComponent"
    const imageGrid=createImageGrid(imagesData);
    gridComponent.appendChild(imageGrid.element);

    main.append(counterComponent, imageModal, gridComponent);


    // Footer

    const footer=document.createElement('footer');
    footer.className='bg-white shadow-lg bottom-0 z-40';
    const footerContent=document.createElement('div');
    footerContent.className="max-w-7xl mx-auto px-6 py-6";

    const footerTitle=document.createElement('h3');
    footerTitle.className="text-3xl font-bold text-purple-800 mb-2";
    footerTitle.textContent="Sergio Fernández Fernández";

    const footerSubtitle = document.createElement('p');

    // Crear el enlace
    const githubLink = document.createElement('a');
    githubLink.href = 'https://github.com/sergief03';
    githubLink.target = '_blank'; // abre en nueva pestaña

    // Poner el SVG dentro del enlace
    githubLink.innerHTML = `
    <svg height="32" width="32" viewBox="0 0 16 16" version="1.1" aria-hidden="true">
        <path fill-rule="evenodd" 
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 
            6.53 5.47 7.59.4.07.55-.17.55-.38 
            0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52
            -.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89
            -3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.5 7.5 0 012-.27c.68.003 
            1.36.092 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 
            3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42
            -3.58-8-8-8z">
        </path>
    </svg>
    `;

    // Añadir el enlace al párrafo
    footerSubtitle.appendChild(githubLink);

    footerContent.appendChild(footerTitle);
    footerContent.appendChild(footerSubtitle);
    footer.appendChild(footerContent);


    //Añadimos todo al container
    container.append(header, main, footer);

    return {
        element: container,

    }
}
