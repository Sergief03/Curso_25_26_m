import {  } from "../db/data";

const VITE_URL_DATA=import.meta.env.VITE_URL_DATA;

/**
 * Genera una lista de proyectos con sus respectivas tecnologias y una etiqueta
 * de destacado si es necesario
 * 
 * @param {Object[]} data - La lista de proyectos
 * @param {String} filter - El filtro a aplicar
 * @returns {HTMLElement[]} Una lista de elementos HTML con la informaci n de los proyectos
 */
function cards(data,filter="Todos"){
    const cards=[];

    data.filter(e=>filter==="Todos"? true: e.tecnologias.includes(filter))
    .forEach(e=>{
        const projectCard=document.createElement('div');
        const projectCardContent=document.createElement('div');
        if(e.destacado){
            const featuredBadge=document.createElement('span');
            featuredBadge.textContent="⭐";
            featuredBadge.classList.add('featured-badge');
            projectCardContent.appendChild(featuredBadge);
        }

        const title=document.createElement('h3');
        title.textContent=e.titulo;
        title.classList.add('project-title');

        const description=document.createElement('p');
        description.textContent=e.descripcion;
        description.classList.add('project-description');

        const tecnologiasContainer=document.createElement('div');
        tecnologiasContainer.classList.add('tech-stack');

        e.tecnologias.forEach(t=>{
            const tecnologia=document.createElement('span');
            tecnologia.textContent=t;
            tecnologia.classList.add('tech-badge');
            tecnologiasContainer.appendChild(tecnologia);
        });

        projectCardContent.appendChild(title);
        projectCardContent.appendChild(description);
        projectCardContent.appendChild(tecnologiasContainer);

        projectCard.appendChild(projectCardContent);

        cards.push(projectCard);
    });

    return cards;
}

export async function createEjercicio10() {

    fetch(`${VITE_URL_DATA}proyectos`)
    .then(response=>response.json())
    .then(data=>{


        const app=document.getElementById('app');


        const portfolioContainer=document.createElement('div');

        const filtersContainer=document.createElement('div');

        const filtros=["Todos", "React", "Javascript","Vue.js","Node.js"];


/**
 * Renderiza la grilla de proyectos con un filtro
 * 
 * @param {string} filter - El filtro a aplicar
 */
        const render=(filter)=>{
            proyectosGrid.innerHTML = "";

            // Generar cards filtradas
            const cardsFiltradas = cards(data, filter);

            // Insertar nuevas
            proyectosGrid.append(...cardsFiltradas);

            // Actualizar contador
            proyectsCount.textContent = `${cardsFiltradas.length} proyectos`;

            // Marcar como activo el botón correspondiente
            [...filtersContainer.children].forEach(btn => {
                if (btn.textContent === filter) {
                    btn.classList.add("bg-blue-700");
                    btn.classList.remove("bg-blue-500");
                } else {
                    btn.classList.remove("bg-blue-700");
                    btn.classList.add("bg-blue-500");
                }
            });
        }

        filtros.forEach(e=>{
            const boton=document.createElement('button');
            boton.textContent=e;
            boton.classList.add('active');

            boton.addEventListener("click", () => {
                render(e);
            });

            filtersContainer.appendChild(boton);
        })


        const proyectsCount=document.createElement('p');

        const proyectosGrid=document.createElement('div');


        const projectCards=cards(data,"Todos");

        proyectosGrid.append(...projectCards);
        

        proyectsCount.textContent=`${projectCards.length} proyectos`;

        portfolioContainer.appendChild(filtersContainer);
        portfolioContainer.appendChild(proyectsCount);
        portfolioContainer.appendChild(proyectosGrid);

        app.appendChild(portfolioContainer);
    });
}