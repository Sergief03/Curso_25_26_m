//primitivos en TypeScript

//1.-String
let nombre: string = "Sergio";
let cp: string = "12345";

let mensaje: string = `El nombre es ${nombre} y el CP es ${cp}`;

function procesarTexto(texto: string): string {
  return texto.trim().toUpperCase();
}

console.log(procesarTexto(mensaje));

let saludo = "Que tal";
procesarTexto(saludo);

//2.-Number

//Crear una funcion que se llama calcularPrecioFinal(precio,impuesto,descuento) y devolvera el precio final con todo aplicado
function calcularPrecioFinal(
  precio: number,
  impuesto: number,
  descuento: number
): number {
  return precio * (1 + impuesto / 100) * (1 - descuento / 100);
}

console.log(calcularPrecioFinal(100, 21, 10));

//Cualquier tipo any (no usar salvo)
//funcion que verifique que lo que pase como parametro sea de tipo number
//NO es infinito, !isNaN
function esNumero(a: any): boolean {
  return typeof a === "number" && !isNaN(a) && isFinite(a);
}

//Calcualar promedio de los elementos de un array de numeros

function calcularPromedio(array: number[]): number {
  if (array.length === 0) {
    throw new Error("El array esta vacio");
  }
  return (
    array.reduce((acumulador, elemento) => acumulador + elemento, 0) /
    array.length
  );
}

function calcularExtremos(array: number[]): { min: number; max: number } {
  if (array.length === 0) {
    throw new Error("El array esta vacio");
  }

  return {
    min: Math.min(...array),
    max: Math.max(...array),
  };
}

//Comprobar si es un email es correcto
function esEmailValido(emali: string): boolean {
  //. y espacio son caracteres especiales hay que escaparlos con \. y \s
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@0-9]+$/;
  return emailRegex.test(emali);
}

console.log(esEmailValido("aa@aa.aa"));

//interface tipo de dato generado por el usuario para una determinada situacion
interface permisosUsuario {
  puedeLeer: boolean;
  puedeEscribir: boolean;
  puedeBorrar: boolean;
}

//crear una funcion llamada obtenerPermisos que dependiendo de si el usuario es admin,invitado o usuario;
// cambie los permisos de la interfaz

type tipoUsuario = "invitado" | "admin" | "usuario";
//type permite crear un tipo de dato entre unos valores dados

function obtenerPermisos(tipo: tipoUsuario): permisosUsuario {
  switch (tipo) {
    case "invitado":
      return { puedeLeer: true, puedeEscribir: false, puedeBorrar: false };
    case "admin":
      return { puedeLeer: true, puedeEscribir: true, puedeBorrar: true };
    case "usuario":
      return { puedeLeer: true, puedeEscribir: false, puedeBorrar: false };
  }
}

console.log(obtenerPermisos("admin"));

//3.-Null y Undefined

let posibleNombre: string | null = "invitado";
let posibleNombreIndefinido: string | undefined = "invitado";

//arrow function
const multiplica = (numero: number): number => {
  return numero * 2;
};

//Crear una funcion que le pase como parametro un array de objetos y me devuelva los usuarios que son mayores de edad

const usuarios = [
  { nombre: "Sergio", edad: 24 },
  { nombre: "Maria", edad: 12 },
  { nombre: "Paco", edad: 4 },
  { nombre: "Pepe", edad: 24 },
];

const mayorEdad = (array: { nombre: string; edad: number }[]) => {
  return array.filter((usuario) => usuario.edad >= 18);
};

console.log(mayorEdad(usuarios));

//Funcion procesarNumeros que cree devuleva un array de numeros solo positivos,
//multiplicados por 2 y ordenados de menor a mayor

const misNumeros: number[] = [-1, 2, -3, 4, -5];

const procesarNumeros = (array: number[]) => {
  return array
    .filter((numero) => numero > 0)
    .map((numero) => numero * 2)
    .sort((a, b) => b - a);
};

console.log(procesarNumeros(misNumeros));

//ejercicio

interface Cliente {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
}

//Crear un afuncion que genere un MAP con la siguiente estructura
/*
{
  idUsuario:{
    nombre:string,
    email:string,
    telefono:string
  },
}
*/

const clientes: Cliente[] = [
  { id: 1, nombre: "Sergio", email: "1@1.com", telefono: "123456789" },
  { id: 2, nombre: "Maria", email: "2@2.com", telefono: "123456789" },
  { id: 3, nombre: "Paco", email: "3@3.com", telefono: "123456789" },
  { id: 4, nombre: "Pepe", email: "4@4.com", telefono: "123456789" },
];

const clientesMap = (clientes: Cliente[]) =>
  clientes.reduce((acc, cliente) => {
    return acc.set(cliente.id, {
      nombre: cliente.nombre,
      email: cliente.email,
      telefono: cliente.telefono,
    });
  }, new Map());

//Crear una calculador tipada que realice operaciones basicas
//Para ello partimos de una interfaz llamada operacion formada por tipo con sumar,restar, multiplicar,dividir
//segundo elemento opereando 1 y tercer elemento operando 2
//Creamos una funcion llamada calculadora que le pasamos una operacion de tipo operacion y me devolvera el resultado de los
//dos operandos, probarlo con 10,5 y 10,0
//se podria ampliar a otras operaciones?

interface operacion {
  tipo: "sumar" | "restar" | "multiplicar" | "dividir";
  operando1: number;
  operando2: number;
}

const calculadora = (operacion: operacion): number => {
  switch (operacion.tipo) {
    case "sumar":
      return operacion.operando1 + operacion.operando2;
    case "restar":
      return operacion.operando1 - operacion.operando2;
    case "multiplicar":
      return operacion.operando1 * operacion.operando2;
    case "dividir":
      if (operacion.operando1 === 0 || operacion.operando2 === 0) {
        throw new Error("No se puede dividir por 0");
      }
      const resultado = operacion.operando1 / operacion.operando2;
      return resultado;
  }
};

console.log(calculadora({ tipo: "sumar", operando1: 10, operando2: 5 }));
console.log(calculadora({ tipo: "dividir", operando1: 10, operando2: 0 }));

//4.- Map y Set

const edades = new Map<string, number>();

edades.set("Sergio", 24);
edades.set("Maria", 12);
edades.set("Paco", 4);
edades.set("Pepe", 24);

edades.has("Sergio");

edades.get("Sergio");

edades.delete("Sergio");

interface Datos {
  nombre: string;
  email: string;
  cp: number;
}

const usuarios2 = new Map<string, Datos>();

usuarios2.set("Sergio", { nombre: "Sergio", email: "1@1.com", cp: 12345 });
usuarios2.set("Maria", { nombre: "Maria", email: "2@2.com", cp: 12345 });
usuarios2.set("Paco", { nombre: "Paco", email: "3@3.com", cp: 12345 });
usuarios2.set("Pepe", { nombre: "Pepe", email: "4@4.com", cp: 12345 });

const mySet = new Set<string>();
mySet.add("Sergio");

//Crea un sistema de categorias:
//crear un map donde categoria tiene un set de productos, llamar a dicho map catalogo.
// crear las siguientes funciones agregar producto que devolvera boolean y
// crear una funcion llamada mostrar catalogo que muestre el catalogo
// adicionalmente crear una funcion llamada buscar producto que le pase un string y que busque por nombre de producto

//Nota cuidado con el get que a veces devuelve undefined

interface Producto {
  id: string;
  nombre: string;
  precio: number;
}

const catalogo = new Map<string, Set<Producto>>();

const agregarProducto = (categoria: string, producto: Producto): boolean => {
  const productos = catalogo.get(categoria);
  if (productos) {
    return productos.add(producto) ? true : false;
  }

  return catalogo.set(categoria, new Set<Producto>().add(producto))
    ? true
    : false;
};

agregarProducto("ropa", {
  id: "1",
  nombre: "Camisa",
  precio: 10,
});

const mostrarCatalogo = (catalogo: Map<string, Set<Producto>>): void => {
  catalogo.forEach((productos, categoria) => {
    console.log(
      `Categoria: ${categoria} ------- Numero de productos: ${productos.size}`
    );
    productos.forEach((producto) => {
      console.log(`- ${producto.nombre}`);
    });
  });
};

mostrarCatalogo(catalogo);

const buscarProducto = (
  catalogo: Map<string, Set<Producto>>,
  nombreProducto: string
) => {
  catalogo.forEach((productos) => {
    productos.forEach((producto) => {
      if (producto.nombre === nombreProducto) {
        console.log(producto);
      }
    });
  });
};

buscarProducto(catalogo, "Camisa");


// Crear un sistema de reservas de un restaurante que tenga un Map con clave la hora  de la reserva en formato YYYY-MM-DD
// y como valor es un Set con los nombres de los clientes que han reservado ese dia
// funciones:
// agregarReservas
// cancelarReservas
// mostrarReservas
// estadisticas(reservas por dia, reservas totales, media de reservas)

const reservas = new Map<string, Set<string> >();

const agregaReserva=(fecha:Date, cliente:string):boolean=>{
  const fechaFormato= new Date(fecha).toLocaleDateString('en-US');
  if(reservas.has(fechaFormato)){
    return reservas.get(fechaFormato)?.add(cliente)?true:false;
  }

  return reservas.set(fechaFormato, new Set<string>().add(cliente))?true:false;
}

console.log("====================== Agregar reserva ======================")
console.log(agregaReserva(new Date("01-01-2022"), "Sergio")? "Reserva creada":"No se ha podido crear la reserva");


const cancelarReserva=(fecha:Date,cliente:string):boolean=>{
  const fechaFormato= new Date(fecha).toLocaleDateString('en-US');
  if(reservas.has(fechaFormato)){
    return reservas.get(fechaFormato)?.delete(cliente)?true:false;
  }

  return false;
}
console.log("====================== Cancelar reserva ======================")
console.log(cancelarReserva(new Date("2022-01-01"), "Sergio")? "Reserva cancelada":"No se ha podido cancelar la reserva");



const mostrarReservas=():void=>{
  reservas.forEach((reservas,fecha)=>{
    console.log(`Fecha: ${fecha}`);
    reservas.forEach((cliente)=>{
      console.log(`- ${cliente}`);
    })
    console.log("-------------------------------------------")
  })
}


agregaReserva(new Date("2022-01-01"), "Sergio");
agregaReserva(new Date("2022-01-01"), "Maria");
agregaReserva(new Date("2022-01-01"), "Paco");
agregaReserva(new Date("2022-02-02"), "Pepe");
agregaReserva(new Date("2022-03-03"), "Sergio");

console.log("====================== Mostrar reservas ======================")
mostrarReservas();


const estadisticas=():void=>{
  let reservasTotales=0;
  reservas.forEach((clientes,fecha)=>{
    console.log(`Fecha: ${fecha}`);
    console.log(`Reservas del dia: ${clientes.size}`);
    console.log("-----------------------------------------")
    reservasTotales+=clientes.size;
  })
  console.log("-------------------------------------------")
  console.log(`Reservas totales: ${reservasTotales}`);
  console.log("-------------------------------------------")
  console.log(`Media de reservas: ${reservasTotales/reservas.size}`);
  console.log("-------------------------------------------")

}

console.log("====================== Estadisticas ======================")
estadisticas();