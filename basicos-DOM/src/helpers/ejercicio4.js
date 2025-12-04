import { alojamientos } from "../db/data";
import fetching from "../utils/fetch";

const VITE_URL_DATA=import.meta.env.VITE_URL_DATA;

export async function createEjercicio4Prueba() {
  fetch(`${VITE_URL_DATA}alojamientos`)
  .then(response=>response.json())
  .then(data=>{
    const app=document.getElementById('app');

    const containerTable=document.createElement('div');
    containerTable.classList.add('table-container');

    const table=document.createElement('table');
    
    containerTable.appendChild(table);

    const thead=document.createElement('thead');
    const trHead=document.createElement('tr');
    const encabezados=['Nombre','Ubicacion','Precio','Rating'];
    encabezados.forEach(element=>{
        const th=document.createElement('th');
        th.textContent=element;
        trHead.appendChild(th);
    });

    thead.appendChild(trHead);
    table.appendChild(thead);

    const tbody=document.createElement('tbody');

    data.forEach(element => {
        const tr = document.createElement('tr');

        // convertir objeto en array de pares y quitar el primero
        const elementosTable = Object.entries(element).slice(1);

        elementosTable.forEach(([key, value]) => {
            const td = document.createElement('td');
            if (key === 'rating') {
                const numeroEstrellas = Math.floor(value);
                const estrellas = '★'.repeat(numeroEstrellas) + '☆'.repeat(5 - numeroEstrellas);
                td.textContent = estrellas + ' ' + value;
            } else if (key === 'precio') {
                td.textContent = value + '€';
            } else {
                td.textContent = value;
            }
            tr.appendChild(td);
        });

        // Añadir la fila a la tabla
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);

    containerTable.appendChild(table);

    app.appendChild(containerTable);
  })
  .catch(error=>console.error(error.message));
}

export function createEjercicio4SinFetch() {
  
    const data=alojamientos;

    const app=document.getElementById('app');

    const containerTable=document.createElement('div');
    containerTable.classList.add('table-container');

    const table=document.createElement('table');
    
    containerTable.appendChild(table);

    const thead=document.createElement('thead');
    const trHead=document.createElement('tr');
    const encabezados=['Nombre','Ubicacion','Precio','Rating'];
    encabezados.forEach(element=>{
        const th=document.createElement('th');
        th.textContent=element;
        trHead.appendChild(th);
    });

    thead.appendChild(trHead);
    table.appendChild(thead);

    const tbody=document.createElement('tbody');

    data.forEach(element => {
        const tr = document.createElement('tr');

        // convertir objeto en array de pares y quitar el primero
        const elementosTable = Object.entries(element).slice(1);

        elementosTable.forEach(([key, value]) => {
            const td = document.createElement('td');
            if (key === 'rating') {
                const numeroEstrellas = Math.floor(value);
                const estrellas = '★'.repeat(numeroEstrellas) + '☆'.repeat(5 - numeroEstrellas);
                td.textContent = estrellas + ' ' + value;
            } else if (key === 'precio') {
                td.textContent = value + '€';
            } else {
                td.textContent = value;
            }
            tr.appendChild(td);
        });

        // Añadir la fila a la tabla
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);

    containerTable.appendChild(table);

    app.appendChild(containerTable);
  
}


export async function createEjercicio4(){
    const noFetching=()=>alojamientos;

    const renderTable=(data)=>{
        const table=document.createElement('table');
    
        const thead=document.createElement('thead');
        const trHead=document.createElement('tr');
        const encabezados=['Nombre','Ubicacion','Precio','Rating','Imagen'];
        encabezados.forEach(element=>{
            const th=document.createElement('th');
            th.textContent=element;
            trHead.appendChild(th);
        });

        thead.appendChild(trHead);
        table.appendChild(thead);

        const tbody=document.createElement('tbody');

        data.forEach(element => {
            const tr = document.createElement('tr');

            // convertir objeto en array de pares y quitar el primero
            const elementosTable = Object.entries(element).slice(1);

            elementosTable.forEach(([key, value]) => {
                const td = document.createElement('td');
                if (key === 'rating') {
                    const numeroEstrellas = Math.floor(value);
                    const estrellas = '★'.repeat(numeroEstrellas) + '☆'.repeat(5 - numeroEstrellas);
                    td.textContent = estrellas + ' ' + value;
                } else if (key === 'precio') {
                    td.textContent = value + '€';
                } else if (key === 'imagen'){
                    const img=document.createElement('img');
                    img.src=value;
                    img.alt=value;
                    img.className='w-32 h-auto';
                    td.appendChild(img);
                }else{
                    td.textContent = value;
                }
                tr.appendChild(td);
            });

            // Añadir la fila a la tabla
            tbody.appendChild(tr);
        });

        table.appendChild(tbody);

        return {
            table,
        }
    }

    const render=async()=>{
        const data = await fetching("alojamientos");

        const app=document.getElementById('app');

        const containerTable=document.createElement('div');
        containerTable.classList.add('table-container');

        const table=renderTable(data).table;

        containerTable.appendChild(table);

        app.appendChild(containerTable);
    }

    return {
        render,

    }
}

