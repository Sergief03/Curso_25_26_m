import { bienvenida } from "../db/data";

const VITE_URL_DATA=import.meta.env.VITE_URL_DATA;

export async function createEjercicio1Fetch() {
    try{
        const app=document.getElementById('app')

        const response = await fetch(`${VITE_URL_DATA}bienvenida`);
        const data = await response.json();

        const bienvenida=document.createElement('p');

        bienvenida.textContent=data.texto;
        bienvenida.classList.add('welcome-message');
        
        app.appendChild(bienvenida);

        return {
            element:bienvenida,
        };
    }catch(error){
        throw new Error(error.message);
    }
    
}


export  function createEjercicio1() {
    const data=bienvenida;
    const app=document.getElementById('app')

    const textoBienvenida=document.createElement('p');

    textoBienvenida.textContent=data.texto;
    textoBienvenida.classList.add('welcome-message');
        
    app.appendChild(textoBienvenida);

    return {
        element:textoBienvenida,
    };

}
