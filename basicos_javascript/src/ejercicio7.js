//Objetos javascript

const usuario = {
  nombre: "Sergio",
  email: "sergiofdez1511@gmail.com",
  activo: true,
};

//para obetener las claves
const claves = Object.keys(usuario); //[nombre,email,activo]

//Utilidad verificar si las claves estan todas siguiendo un objeto de partida
//1.- ¿como compruebo que todas las claves existen?
function validarCamposRequeridos(objeto, camposRequeridos) {
  const claves = Object.keys(objeto);
  //retorno true o false
  return camposRequeridos.every((campo) => claves.includes(campo));
}

//para los valores: values
const producto = {
  nombre: "laptop",
  stock: 100,
  precio: 1100,
  destacado: true,
};

const valores = Object.values(producto); //[laptop,100,1100,true]

//Verificar si algun valor cumple una condicion

const precipitaciones = {
  enero: 100,
  febrero: 98,
  marzo: 120,
  abril: 50,
};

//Algun mes la precipitacion fue superior a 100 litros?

const mesSuperiorCien = Object.values(precipitaciones).some(
  (precipitacion) => precipitacion > 100
);

//Cuantos litros totales han caido en los mes meses enero-abril?

const totalPrecipitaciones = Object.values(precipitaciones).reduce(
  (total, precipitacion) => total + precipitacion,
  0
);
//calcular la precipitacion maxima

const precipitacionMax = Math.max(...Object.values(precipitaciones));

//Obtener pares [clave,valor] en forma de array <---- entries()

const configuracion = {
  tema: "oscuro",
  idioma: "es",
  notificaciones: true,
  volumen: 75,
};

//Obetner array de pares [clave,valor]

const entradas = Object.entries(configuracion);

/*
    [
        ["tema","oscuro"],
        ["idioma","es"],
        ["notificaciones",true],
        ["volumen",75]
    ]
*/

const usuarioBd = {
  nombre: "Sergio",
  email: "sergiofdez1511@gmail.com",
  password: "bdhabhdbhbds",
  activo: true,
};

//filtrar los campos sensibles de este objeto

Object.entries(usuarioBd);

//destructuring

const { nombre, email } = usuarioBd; //--> const nombre= usuariobd.nombre

const data = [1, 2, 3, 4, 5];

const [a, b, c] = data;

//crear funcion llamada mostrarPersona. Obtener el username y las dos primeras redes sociales que el usuario tenga

const user = {
  id: 1,
  info: {
    username: "sergio",
    redes: ["twitter", "github", "linkedin"],
  },
};

function mostrarPersona(objeto) {
  const {
    info: {
      username,
      redes: [r1, r2],
    },
  } = objeto;
  return username + r1 + r2;
}

//Obtener el nombre y la edad del siguiente objeto. Si no existe edad que guarde el valor 0

const data4 = {
  id: 101,
  usuario: {
    perfil: {
      nombre: "Lucia",
      edad: 28,
      direccion: {
        ciudad: "Granada",
        pais: "España",
      },
    },
    activo: true,
  },
};

const {
  usuario: { perfil: nombre2, edad = 0 },
} = data4;

const productos = [
  {
    id: 1,
    nombre: "Laptop",
    precio: 1000,
    fabricante: {
      nombre: "HP",
      pais: "USA",
      contacto: {
        email: "info@hp.com",
        telefono: "+1-555-0123",
      },
    },
    especificaciones: {
      ram: "16GB",
      cpu: "Intel i7",
    },
  },
  {
    id: 2,
    nombre: "Smartphone",
    precio: 800,
    fabricante: {
      nombre: "Samsung",
      pais: "Corea del Sur",
      contacto: {
        email: "support@samsung.com",
        telefono: "+82-555-4567",
      },
    },
    especificaciones: {
      ram: "8GB",
      cpu: "Exynos 2100",
    },
  },
  {
    id: 3,
    nombre: "Tablet",
    precio: 500,
    fabricante: {
      nombre: "Apple",
      pais: "USA",
      contacto: {
        email: "contact@apple.com",
        telefono: "+1-555-7890",
      },
    },
    especificaciones: {
      ram: "6GB",
      cpu: "Apple M1",
    },
  },
];

//Crear funcion que extraiga los datos del objeto y me devuelve la siguiente estuctura

//nombre,fabricante{nombre,contacto},especificaciones (ram)
//imaginemos un array de productos
//Usando la nueva especificaion obtener el nombre del producto con mas ram

function extraerDatos(prod) {
  return ({
    nombre,
    fabricante: { nombre: nombreFab, contacto },
    especificaciones: { ram },
  } = prod);
}

const newDataArray = (arrayProducts) =>
  arrayProducts.map((producto) => extraerDatos(producto));

console.log(newDataArray(productos))


