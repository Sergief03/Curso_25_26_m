const numeros = [1, 2, 3, 4, 5];

//generar un objeto resumen de mi array que tenga los siguientes campos:
/*
{
    valor: "numero_correspondiente",
    posicion: "psocion_dentro_del_array",
    esUltimo: "array_que_me_diga_si_es_el_ultimo(TRUE|FALSE)"
}
*/

const resumenNumeros = numeros.map((numero, index, array) => {
  return {
    valor: numero,
    posicion: index,
    esUltimo: array.length - 1 === index ? true : false,
  };
});

console.log(resumenNumeros); //array de objetos mapeados de una estructura dada

const productos = [
  {
    nombre: "laptop",
    price: 1000,
    stock: 1000,
    activo: true,
  },
  {
    nombre: "Mouse Logitech",
    price: 28.56,
    stock: 0,
    activo: false,
  },
];

/*
Mapeado:

{
    nombre
    precioOriginal
    precioCOnIva
    hayStock
}
*/

const mapProductos = productos.map((producto) => {
  return {
    name: producto.nombre,
    originalPrice: producto.precio,
    priceWithIva: producto.precio * 1.21,
    available: producto.stock === 0 ? false : true,
  };
});

// filtrame los productos que tienen stock y estan activos
const filterProduct = productos.filter(
  (producto) => producto.stock > 0 && producto.activo
);

//busca todos los laptop de forma case insensitive

const laptopInformation = productos.filter((producto) =>
  producto.nombre.toLowerCase().includes("laptop".toLowerCase())
);

/**
 * - Busca una palabra dentro del nombre de un array
 * @param {array} array -Array con objetos
 * @param {string} palabra -Palabra a buscar
 * @returns {array} -Array con los objetos que contienen esas palabras
 */
function buscarPalabras(array, palabra) {
  return array.filter((producto) =>
    producto.nombre.toLowerCase().includes(palabra.toLowerCase())
  );
}

const buscarPalabrass = (array, palabra) =>
  array.filter((producto) =>
    producto.nombre.toLowerCase().includes(palabra.toLowerCase())
  );

console.log(laptopInformation);

//Quiero crear una funciona que le pase como parametro un array de productos, precio_inicial, precio_final y devuelva los produtcos cuyo precio
//esta en ese rango de valores (sin incluirlos)

/**
 * -Busca los producto que estan dentro de un rango de precio
 * @param {array} arrayProductos -Array con productos
 * @param {number} precioInicial -Precio inicial del rango
 * @param {number} precioFinal -Precio final del rango
 * @returns {array} -Array con los productos dentro del rango
 */
const filterPrice = (arrayProductos, precioInicial, precioFinal) => {
  if (
    typeof precioInicial === "number" &&
    typeof precioFinal === "number" &&
    precioInicial > 0 &&
    precioFinal > 0 &&
    precioFinal > precioInicial
  ) {
    arrayProductos.filter(
      (producto) =>
        producto.precio > precioInicial && producto.precio < precioFinal
    );
  }
};

const carrito = [
  {
    nombre: "Laptop",
    price: 1000,
    cantidad: 1,
    category: "Electronica",
  },
  {
    nombre: "Mouse Logitech",
    price: 28.56,
    cantidad: 2,
    category: "Electronica",
  },
  {
    nombre: "Monitor MSI 24",
    price: 210.6,
    cantidad: 10,
    category: "Electronica",
  },
  {
    nombre: "Teclado mecanico",
    price: 150,
    cantidad: 10,
    category: "Electronica",
  },
  {
    nombre: "Polo Scalper",
    price: 150,
    cantidad: 2,
    category: "Ropa",
  },
  {
    nombre: "Pantalon Stradivarius",
    price: 45,
    cantidad: 5,
    category: "Ropa",
  },
];

/**
 * -Dado un array con productos devuelve el precio total de todo
 * @author: Sergio Fernández Fernández
 * @param {Object[]} array - Array con los productos
 * @param {number} iva -Iva a aplicar
 * @returns {number} -Precio total
 */
const precioPagar = (array = [], iva = 1.21) =>
  array.reduce(
    (total, product) => total + product.price * iva * product.cantidad,
    0
  );

// Agrupar el carrito por categorias
/*
{
  Electronica: [
    {
  }
  ]
  Ropa: [
    {
  }
  ]
}
*/

const agrupar = (array) => {
  array.reduce(
    (acumulador, producto) =>
      (acumulador[producto.category] ?? []).push(producto),
    {}
  );
};

//Cojo un array de votos y crear una funcion que cuente cuantos votos tiene cada uno de los usuarios

const votos = ["ana", "ana", "pepe", "juan"];
const votosUsuario = (array) =>
  array.reduce((acumulador, voto) => {
    acumulador[voto] = (acumulador[voto] ?? 0) + 1;
    return acumulador;
  }, {});
console.log(votosUsuario(votos));

//buscar el usuario cuyo id=2 y obtener el rol que tiene

const buscarUsuario = (array = [], idBusqueda = 1) => {
  array.find((user) =>
    Number(user.id) === Number(idBusqueda) ? user.rol : "Usuario no encontrado"
  );
};

//buscar el indice del array donde se encuentra el usuario con id buscado

const findUsersIndex = (users = [], id = 1) =>
  users.findIndex((user) => Number(user.id) === Number(id));

//devuelve -1 si findIndex devuelve error o no encuentra la accion requerida

//some()-> devuelve true si al menos un elemento cumple la condicion *****
const numero = [4, 5, 2, 4, 3, 1];
//¿Hay numeros pares en ese array?
const hayPares = numeros.some((numero) => numero % 2 === 0); //Devuelve true o false si hay algun numero par
