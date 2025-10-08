//Ejercicio: Destructuring

import { productos } from "../data/data";
import { extraerDatos } from "../helpers/myFunction";

//Crear funcion que extraiga los datos del objeto y me devuelve la siguiente estuctura

//nombre,fabricante{nombre,contacto},especificaciones (ram)
//imaginemos un array de productos
//Usando la nueva especificaion obtener el nombre del producto con mas ram

const newDataArray = (arrayProducts) =>
  arrayProducts.map((product) => extraerDatos(product));

console.log(...newDataArray(productos));

const maxRam = (arrayProducts) => {
  return arrayProducts
    .map((product) => Number(product.ram.slice(0, -2)))
    .reduce((max, actual) => (max > actual ? max : actual), 0);
  //return Math.max(...arrayProducts.map(product=>product.ram.slice(0,-2)))
};
console.log(maxRam(newDataArray(productos)));
