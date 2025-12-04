// Datos para ejercicios de DOM
// Este archivo contiene los datos que se usarÃ¡n en lugar de peticiones fetch

// Datos para el Ejercicio 1: Mensaje de bienvenida
export const bienvenida = {
  texto: "Hola, bienvenido a JavaScript"
};

// Datos para el Ejercicio 2: Lista de tareas
export const tareas = [
  { id: 1, texto: "Estudiar JavaScript", completada: false },
  { id: 2, texto: "Hacer ejercicios", completada: false },
  { id: 3, texto: "Crear un proyecto", completada: false },
  { id: 4, texto: "Practicar DOM", completada: true },
  { id: 5, texto: "Leer documentaciÃ³n", completada: false }
];

// Datos para el Ejercicio 3: PelÃ­culas
export const peliculas = [
  { id: 1, titulo: "Inception", año: 2010, rating: 8.8 },
  { id: 2, titulo: "The Dark Knight", año:  2008, rating: 9.0 },
  { id: 3, titulo: "Interstellar", año: 2014, rating: 8.6 },
  { id: 4, titulo: "Pulp Fiction", año: 1994, rating: 8.9 },
  { id: 5, titulo: "The Matrix", año: 1999, rating: 8.7 },
  { id: 6, titulo: "Forrest Gump", año: 1994, rating: 8.8 }
];

// Datos para el Ejercicio 4: Alojamientos
export const alojamientos = [
  { id: 1, nombre: "Apartamento Centro", ubicacion: "Barcelona", precio: 85, rating: 4.7 },
  { id: 2, nombre: "Hotel 4 Estrellas", ubicacion: "Barcelona", precio: 120, rating: 4.9 },
  { id: 3, nombre: "CabaÃ±a Playa", ubicacion: "Valencia", precio: 65, rating: 4.8 },
  { id: 4, nombre: "Hostel Moderno", ubicacion: "Madrid", precio: 45, rating: 4.2 },
  { id: 5, nombre: "Villa Lujo", ubicacion: "Marbella", precio: 250, rating: 4.9 },
  { id: 6, nombre: "Apartamento Playa", ubicacion: "Alicante", precio: 75, rating: 4.5 }
];

// Datos para el Ejercicio 5: Ubicaciones
export const ubicaciones = [
  { id: 1, nombre: "Barcelona", pais: "EspaÃ±a" },
  { id: 2, nombre: "Valencia", pais: "EspaÃ±a" },
  { id: 3, nombre: "Madrid", pais: "EspaÃ±a" },
  { id: 4, nombre: "Sevilla", pais: "EspaÃ±a" },
  { id: 5, nombre: "Bilbao", pais: "EspaÃ±a" }
];

// Datos adicionales para practicar
export const usuarios = [
  { id: 1, nombre: "Ana", edad: 28, email: "ana@example.com" },
  { id: 2, nombre: "Luis", edad: 34, email: "luis@example.com" },
  { id: 3, nombre: "MarÃ­a", edad: 22, email: "maria@example.com" },
  { id: 4, nombre: "Carlos", edad: 41, email: "carlos@example.com" }
];

export const productos = [
  { id: 1, nombre: "Laptop", precio: 899, categoria: "ElectrÃ³nica", stock: 15 },
  { id: 2, nombre: "Mouse", precio: 25, categoria: "Accesorios", stock: 50 },
  { id: 3, nombre: "Teclado", precio: 75, categoria: "Accesorios", stock: 30 },
  { id: 4, nombre: "Monitor", precio: 350, categoria: "ElectrÃ³nica", stock: 20 }
];

// Datos para el Ejercicio 6: Usuarios con habilidades
export const usuariosConHabilidades = [
  {
    id: 1,
    nombre: "Ana GarcÃ­a",
    edad: 28,
    email: "ana@example.com",
    habilidades: ["JavaScript", "React", "CSS"],
    nivel: "Senior"
  },
  {
    id: 2,
    nombre: "Luis MartÃ­nez",
    edad: 34,
    email: "luis@example.com",
    habilidades: ["HTML", "CSS", "JavaScript"],
    nivel: "Junior"
  },
  {
    id: 3,
    nombre: "MarÃ­a LÃ³pez",
    edad: 22,
    email: "maria@example.com",
    habilidades: ["Python", "Django", "SQL"],
    nivel: "Junior"
  },
  {
    id: 4,
    nombre: "Carlos RodrÃ­guez",
    edad: 41,
    email: "carlos@example.com",
    habilidades: ["Java", "Spring", "Docker"],
    nivel: "Senior"
  }
];

// Datos para el Ejercicio 7: Publicaciones de blog
export const publicaciones = [
  {
    id: 1,
    titulo: "IntroducciÃ³n a JavaScript",
    autor: "Ana GarcÃ­a",
    fecha: "2024-01-15",
    contenido: "JavaScript es un lenguaje de programaciÃ³n versÃ¡til que se ejecuta en el navegador...",
    etiquetas: ["JavaScript", "ProgramaciÃ³n", "Web"],
    likes: 42
  },
  {
    id: 2,
    titulo: "CSS Grid vs Flexbox",
    autor: "Luis MartÃ­nez",
    fecha: "2024-01-20",
    contenido: "Tanto CSS Grid como Flexbox son herramientas poderosas para crear layouts...",
    etiquetas: ["CSS", "DiseÃ±o", "Frontend"],
    likes: 38
  },
  {
    id: 3,
    titulo: "React Hooks Explicado",
    autor: "MarÃ­a LÃ³pez",
    fecha: "2024-02-01",
    contenido: "Los Hooks revolucionaron la forma en que escribimos componentes React...",
    etiquetas: ["React", "Hooks", "JavaScript"],
    likes: 56
  }
];

// Datos para el Ejercicio 8: MenÃº de restaurante
export const menuRestaurante = {
  categorias: [
    {
      id: 1,
      nombre: "Entrantes",
      platos: [
        { id: 101, nombre: "Ensalada CÃ©sar", precio: 8.50, descripcion: "Lechuga romana, parmesano, crutones" },
        { id: 102, nombre: "Bruschetta", precio: 6.75, descripcion: "Pan tostado con tomate y albahaca" },
        { id: 103, nombre: "Gazpacho", precio: 5.50, descripcion: "Sopa frÃ­a de tomate y pimiento" }
      ]
    },
    {
      id: 2,
      nombre: "Platos Principales",
      platos: [
        { id: 201, nombre: "Paella Valenciana", precio: 18.90, descripcion: "Arroz con marisco y pollo" },
        { id: 202, nombre: "Carrilleras al Vino", precio: 16.50, descripcion: "Carrilleras de cerdo cocinadas lentamente" },
        { id: 203, nombre: "Merluza a la Vasca", precio: 19.75, descripcion: "Merluza con salsa de almejas" }
      ]
    },
    {
      id: 3,
      nombre: "Postres",
      platos: [
        { id: 301, nombre: "TiramisÃº", precio: 5.25, descripcion: "Postre italiano con cafÃ© y mascarpone" },
        { id: 302, nombre: "Flan de Huevo", precio: 3.75, descripcion: "Postre tradicional espaÃ±ol" },
        { id: 303, nombre: "Brownie con Helado", precio: 6.50, descripcion: "Brownie de chocolate con helado de vainilla" }
      ]
    }
  ]
};

// Datos para el Ejercicio 9: Eventos y conferencias
export const eventos = [
  {
    id: 1,
    nombre: "Frontend Conference 2024",
    fecha: "2024-03-15",
    hora: "09:00",
    lugar: "Centro de Convenciones, Madrid",
    ponentes: ["Ana GarcÃ­a", "Carlos RodrÃ­guez"],
    asistentes: 250,
    precio: 75.00
  },
  {
    id: 2,
    nombre: "JavaScript Summit",
    fecha: "2024-04-20",
    hora: "10:00",
    lugar: "Palacio de Exposiciones, Barcelona",
    ponentes: ["Luis MartÃ­nez", "MarÃ­a LÃ³pez", "Ana GarcÃ­a"],
    asistentes: 180,
    precio: 60.00
  },
  {
    id: 3,
    nombre: "CSS Workshop",
    fecha: "2024-05-10",
    hora: "15:00",
    lugar: "Centro TecnolÃ³gico, Valencia",
    ponentes: ["Luis MartÃ­nez"],
    asistentes: 45,
    precio: 40.00
  }
];

// Datos para el Ejercicio 10: Proyectos de portafolio
export const proyectos = [
  {
    id: 1,
    titulo: "E-commerce Moderno",
    descripcion: "Tienda online con carrito de compras y pasarela de pago",
    tecnologias: ["React", "Node.js", "MongoDB"],
    imagen: "https://via.placeholder.com/300x200/4f46e5/ffffff?text=E-commerce",
    url: "https://ejemplo-ecommerce.com",
    destacado: true,
    fechaFinalizacion: "2024-01-20"
  },
  {
    id: 2,
    titulo: "App del Clima",
    descripcion: "AplicaciÃ³n web para consultar el pronÃ³stico del tiempo",
    tecnologias: ["Vue.js", "API REST", "Chart.js"],
    imagen: "https://via.placeholder.com/300x200/059669/ffffff?text=Clima",
    url: "https://ejemplo-clima.com",
    destacado: false,
    fechaFinalizacion: "2023-12-15"
  },
  {
    id: 3,
    titulo: "Gestor de Tareas",
    descripcion: "AplicaciÃ³n para organizar y trackear tareas diarias",
    tecnologias: ["JavaScript", "LocalStorage", "CSS Grid"],
    imagen: "https://via.placeholder.com/300x200/dc2626/ffffff?text=Tareas",
    url: "https://ejemplo-tareas.com",
    destacado: true,
    fechaFinalizacion: "2024-02-10"
  },
  {
    id: 4,
    titulo: "Blog Personal",
    descripcion: "Sistema de blogging con Markdown y comentarios",
    tecnologias: ["Next.js", "Markdown", "Tailwind CSS"],
    imagen: "https://via.placeholder.com/300x200/7c3aed/ffffff?text=Blog",
    url: "https://ejemplo-blog.com",
    destacado: false,
    fechaFinalizacion: "2023-11-30"
  }
];