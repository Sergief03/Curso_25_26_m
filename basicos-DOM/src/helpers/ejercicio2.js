import { tareas } from "../db/data";

const VITE_URL_DATA=import.meta.env.VITE_URL_DATA;


export async function createEjercicio2() {
    fetch(`${VITE_URL_DATA}tareas`)
    .then(response=>response.json())
    .then(data=>{
        const lista=document.createElement('ul');
        const app=document.getElementById('app');
        const tareas=[];

        data.forEach(element => {
            const tarea=document.createElement('li');
            tarea.textContent=element.texto;
            if(element.completada){
                tarea.classList.add('completed');
            }
            tarea.classList.add('task-item');

            tareas.push(tarea);
        });

        lista.append(...tareas);
        app.appendChild(lista);

        return{
            element:lista
        }
    })
}

export function createEjercicio2SinFetch() {
    const data=tareas;
    const lista=document.createElement('ul');
    const app=document.getElementById('app');
    const listaTareas=[];

    data.forEach(element => {
        const tarea=document.createElement('li');
        tarea.textContent=element.texto;
        if(element.completada){
            tarea.classList.add('completed');
        }
        tarea.classList.add('task-item');

        listaTareas.push(tarea);
    });

    lista.append(...listaTareas);
    app.appendChild(lista);

    return{
        element:lista
    }
}
