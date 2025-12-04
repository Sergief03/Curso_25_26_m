import { createEjercicio1, createEjercicio1Fetch } from "./helpers/ejercicio1";
import { createEjercicio10 } from "./helpers/ejercicio10";
import { createEjercicio12, createWeatherApp } from "./helpers/ejercicio12";
import createEjercicio13 from "./helpers/ejercicio13";
import { createEjercicio2, createEjercicio2SinFetch } from "./helpers/ejercicio2";
import {createEjercicio3, createEjercicio3SinFetch} from "./helpers/ejercicio3";
import { createEjercicio4, createEjercicio4Prueba, createEjercicio4SinFetch } from "./helpers/ejercicio4";
import { createRickAndMorty } from "./helpers/rick";

export function createApp() {
    // createEjercicio1Fetch();
    // createEjercicio1();

    // createEjercicio2();
    // createEjercicio2SinFetch(); 

    // createEjercicio3();
    // createEjercicio3SinFetch();

    // createEjercicio4 is async and returns a promise — call then to get the object and invoke render
    // createEjercicio4().then(obj => obj.render()).catch(err => console.error(err));
    // createEjercicio4SinFetch();

    // createEjercicio10();

    // createRickAndMorty().render();

    // createEjercicio12().render();

    // createWeatherApp().render();

    createEjercicio13().render();
}
