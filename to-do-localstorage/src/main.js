//Importaciones

import { dbTareas } from "./db/db.js";
import mostrarTareas, { addTareas, completarTarea, rellenarLocalStorage } from "./helpers/tareas.js";

//Inicio de la app

rellenarLocalStorage(dbTareas, "Tareas");
mostrarTareas("Tareas");
completarTarea("1");

addTareas("prueba");
