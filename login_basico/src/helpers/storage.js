import { ENV } from "../config/env.js";
import  bcrypt  from 'bcryptjs'

//Crear una funcion llamada inititaltorage que reciba un usuario y que reciba un array de usuarios y lo guarde en el localStorage

/**
 *
 * @param {*} arrayUsuarios
 */
export const inititaltorage = (arrayUsuarios) => {
  localStorage.setItem(ENV.VITE_STORAGE_KEY, JSON.stringify(arrayUsuarios));
  console.info(`${ENV.VITE_APP_TITLE}Usruarios guardados correctamente.`);
};

//Crear una funcion llamada getUsuarios() que se traiga todos los usuarios
/**
 *
 * @returns
 */
export const getUsuarios = () =>
  JSON.parse(localStorage.getItem(ENV.VITE_STORAGE_KEY) || []);

//Crear una funcion llamada setUsuarios(usuarios) que  cree un usuario y lo guarde en localstorage y lo guarde en la key de .env
/**
 *
 * @param {*} usuarios
 * @returns
 */
export const setUsuarios = (username, password) =>
  inititaltorage([
    ...getUsuarios(),
    {
      id: getUsuarios().length+1,
      username: `${username}`,
      passwordhash: bcrypt.hashSync(`${password}`, 10),
      rol: "normal",
    },
  ]);

export default inititaltorage;
