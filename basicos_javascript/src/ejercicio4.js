// //Usos de los array 

// //Declaracion de un array
// const edades=[];
// const frutas=[];

// //Usando el constructor Array
// const cp=new Array();
// const cc= new Array("423423bhbfhb","2342342","234234");

// frutas[0];

// //Añadir 
// edades.push(23); //Añadir al final
// edades.unshift(12); //Añadir al principio

// //Eliminar
// const ultimo = edades.pop(); //Eliminar el ultimo y retorna el valor eliminado
// const primero = edades.shift(); //Eliminar el primero y retorna el valor eliminado

// // *****  slice  ******
// edades.slice(0,1); //Crea un nuevo array desde la posicion 0 hasta la 1 (sin incluir la posicion 1)

// // *****  map  ******
// const nuevoArray = edades.map((edad) => edad + 1); //Crea un nuevo array con el resultado de la funcion

// // *****  filter  ******
// const mayores = edades.filter((edad) => edad >= 18); //Crea un nuevo array con los elementos que cumplan la condicion

// // Dado un array de nombres crear una función llamada mayúsculas que ponga en mayúsculas todos los elementos de ese array que paso como parámetro
// Crear una función llamada "precios con iva" que al pasar un array de precios me los devuelva con el iva 21 incluido 
// Crear una función llamada "impares cuadrado" que le pase una array de números y em devuelva un array solo con los impares elevados al cuadrado
// "normalizar email" que le pase una array de emails que puede llevar espacios al principio o al final y q los devuelva sin espacios
// "filtrar longitud" que le pase como parametro nombres y un tamaño y devuelva solo un array con los nombres que sean >= que el parámetro de tamaño 
// "normalizar nombres propios" pase array de nombres y me los devuelva con la letra capital mayúscula (nombre y apellidos)
// */

const nombres = [" pedro", "maria ", " juan ", "ana"];

/**
 * Pone en mayusculas todos los elementos de un array
 * @param {array} array - Array de strings a convertir a mayusculas
 * @returns {array} - Nuevo array con los elementos en mayusculas
 */
function mayusculas(array) {
    return array.map((nombre) => nombre.toUpperCase());
}

const precios = [100, 200, 300, 400, 500];
/**
 * Añade el IVA a los precios de un array
 * @param {array} array - Array de números a los que se les quiere añadir el IVA
 * @returns {array} - Nuevo array con los precios con IVA
 */
function preciosConIva(array) {
    return array.map((precio) => precio * 1.21);
}

const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
/**
 * Eleva al cuadrado los números impares de un array
 * @param {array} array - Array de números a procesar
 * @returns {array} - Nuevo array con los números impares elevados al cuadrado
 */
function imparesCuadrado(array) {
    return array.filter(num => (num % 2 !== 0)).map((num) => num ** 2);
}

const emails = ["   ejemplo1@gmail.com   ", "ejemplo2@yahoo.com", "   ejemplo3@hotmail.com   "];
/**
 * Normaliza los emails de un array
 * @param {array} array - Array de strings a normalizar
 * @returns {array} - Nuevo array con los emails normalizados
 */
function normalizarEmail(array) {
    return array.map((email) => email.trim());
}

const nombres2 = ["Pedro", "Ana", "Maria", "Juan", "Alberto"];
/**
 * Filtra los nombres de un array por longitud
 * @param {array} array - Array de strings a filtrar
 * @param {number} tamaño - Tamaño mínimo de los nombres
 * @returns {array} - Nuevo array con los nombres que cumplen la condición
 */
function filtrarLongitud(array, tamaño) {
    return array.filter((nombre) => nombre.length >= tamaño);
}

const nombres3 = ["  pedro perez  ", "maria lopez", "  juan gomez", "ana martinez"] ;
/**
 * Normaliza los nombres propios de un array
 * @param {array} array - Array de strings a normalizar
 * @returns {array} - Nuevo array con los nombres normalizados
 */
function normalizarNombresPropios(array) {
    return array.map((nombre) => {
        const partes=nombre.trim().split(" ").filter(parte=> parte !== "");
        return partes.map((parte)=> parte.charAt(0).toUpperCase() + parte.slice(1).toLowerCase()).join(" ");
    })
}

console.log(normalizarNombresPropios(nombres3));
