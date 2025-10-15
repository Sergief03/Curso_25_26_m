// aqui van las funciones helper para las tareas
import { uid } from "uid";

export const rellenarLocalStorage = (arrayTareas, tareas = "Tareas") => {
  //Guardar en el localStorage en la clave
  try {
    if (!Array.isArray(arrayTareas)) {
      throw new Error("Error, el array de tareas no es valido");
    }

    localStorage.setItem(tareas, JSON.stringify(arrayTareas));
  } catch (error) {
    console.error("Error al guardar");
    throw new Error("Error, al realizar el almacenamiento en el localStorage");
  }
};

//Crear una funcion llamada mostrarTareas que le pase como parametro una clave y me pinte a traves de la consola la tarea, usar console.table
export const mostrarTareas = (clave = "Tareas") => {
  console.table(JSON.parse(localStorage.getItem(clave)));
};

function safeJSONParse(text) {
  try {
    if (typeof text !== "string") {
      throw new Error(`Error al parsear la data ${text}`);
    }
    return JSON.parse(text);
  } catch (error) {
    throw new Error(`Error al parsear la data ${text}`);
  }
}

export const getTareas = () => {
  return JSON.parse(localStorage.getItem("Tareas")) ?? [];
};

export const addTareas = (name) => {
  const tarea = {
    id: uid(),
    nombre: String((name ?? "").trim()),
    fechaCreacion: new Date().toISOString(),
    completada: false,
  };
  getTareas().push(tarea);
  rellenarLocalStorage(getTareas());
};

export const deleteTarea = (id) => {
  const index = getTareas().findIndex((objeto) => objeto.id === id);
  if (index !== -1) {
    getTareas().splice(index, 1);
    rellenarLocalStorage(getTareas());
  }
};

export const completarTarea = (id) => {
  const index = getTareas().findIndex((objeto) => objeto.id === id);
  getTareas().at(index).completada = true;

  rellenarLocalStorage(getTareas());
};

export const descompletarTarea = (id) => {
  const tarea = getTareas().find((objeto) => objeto.id === id);
  if (tarea) {
    tarea.completada = false;
    rellenarLocalStorage(getTareas());
  }
};

export const buscarCompletadas = () =>
  getTareas().filter((objeto) => objeto.completada === true);

export const buscarNoCompletadas = () =>
  getTareas().filter((objeto) => objeto.completada === false);

export const buscarPorNombre = (nombre) =>
  getTareas().filter((objeto) => objeto.completada === nombre);

export default mostrarTareas;
