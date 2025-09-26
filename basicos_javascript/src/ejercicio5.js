// //.at <---- acceso con indice negativo
// const frutas = ["manzana", "banana", "cereza", "naranja"];

// console.log(frutas.at(-1)); // Salida: "naranja"

// //splice <---- elimina elementos de un array
// const numeros1 = [1, 2, 3, 4, 5];
// console.log(numeros1.splice(2, 1)); // Elimina 1 elemento a partir del índice 2

// //concat <---- concatena arrays
// const array1 = [1, 2, 3];
// const array2 = [4, 5, 6];
// const array3 = array1.concat(array2);
// console.log(array3); // Salida: [1, 2, 3, 4, 5, 6]

// const edades = [25, 30, 35, 40, 45];

// const ArrayConcatenado = [...edades, 50, 55, 60];// spread operator*********

// //SET <---- otro tipo de array, no permite duplicados

// const pesos=[70, 80, 90, 70, 80];
// const pesosSinDuplicados=[...new Set(pesos)]; // spread operator*********

// //reduce <---- reduce un array a un solo valor **********
// // pesosSinDuplicados.reduce((acumulador, elemento,indice,array) => acumulador + elemento, 0);
// // acumulador, elemento <---- No opcionales
// console.log(pesos.reduce((suma, peso) => suma + peso, 0)); // Salida: 390

// *****  Ejercicios  ******
/*
Calcular el producto total de un array
Calcular el maximo y el minimo
dado un array que sea  manzana,platano,naranja,manzana,manzana,platano,pera,pera devolverme un objeto clave:valor que me diga nombre de la fruta:cuantas veces aparece
Dado el siguiente array bidimensional  [[1,2],[3,4],[5,6]] devolver un array unidimensional [1,2,3,4,5,6]
*/

//Ejercicio 1
const numeros = [1, 2, 3, 4, 5];
numeros.reduce((producto, numero)=> producto * numero, 1); // Producto total: 120

//Ejercicio 2
//Math.max(...numeros); 
numeros.reduce((maximo,numero)=>maximo>numero?maximo:numero,numeros[0])
numeros.reduce((minimo,numero)=>minimo<numero?minimo:numero,numeros[0])

//Ejercicio 3
const frutas = ["manzana", "platano", "naranja", "manzana", "manzana", "platano", "pera", "pera"];
frutas.reduce((contador, fruta) => {
    contador[fruta] ? (contador[fruta]++) : contador[fruta] = 1
    return contador
},{});

//Ejercicio 4
const arrayBidimensional = [[1, 2], [3, 4], [5, 6]];
arrayBidimensional.reduce((array, elemento) => array.push(...elemento), []);
arrayBidimensional.reduce((array, elemento) => array.concat(elemento), []);

//Array de objetos
const usuarios = [
    { id: 1, nombre: "Juan", edad: 25 ,data: {libros:10}},
    { id: 2, nombre: "Ana", edad: 30 ,data: {libros:100}},
    { id: 3, nombre: "Pedro", edad: 35,data: {libros:25} },
    { id: 4, nombre: "Maria", edad: 28 ,data: {libros:0}},
    { id: 5, nombre: "Luis", edad: 40 ,data: {libros:75}},
    { id: 6, nombre: "Lucia", edad: 22 ,data: {libros:40}},
];

//Dame la informacion del usuario cuyo nombre es Juan
usuarios.find((usuario) => usuario.nombre.toLowerCase() === "juan");
let resultados=usuarios.find((usuario)=> Number(usuario.edad) >= 28)??{};

//Dado el suguiente array de usuarios, dar un array con los nombres de los usuarios que tengan mas de 20 libros
usuarios.filter((usuario)=> usuario.data.libros>20).map((usuarios)=> usuarios.nombre);

//Obetener el valor promedio total de todos los libros si suponemos un precio medio de 28 euros por libro
usuarios.reduce((total,usuario)=> total+(usuario.data.libros*28),0)/usuarios.length;
//Decir que usuarios no tienen libros
usuarios.filter(usuario=> usuarios.data.libros===0).map(usuario=>usuario.nombre);

