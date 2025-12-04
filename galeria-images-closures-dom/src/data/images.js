/**
 * Fuente de datos estÃ¡tica del ejercicio. Contiene los metadatos mÃ­nimos
 * que consume la interfaz (tÃ­tulo, autor, categorÃ­a, fecha y URL) y
 * simula la respuesta de una API externa. El timestamp permite ordenar por
 * fecha y el identificador Ãºnico sirve para enlazar favoritos y abrir el
 * modal.
 * Estos registros se podrÃ­an sustituir por una llamada a una API real.
 */
export const imagesData = [
  {
    id: 1,
    title: 'MontaÃ±as al atardecer',
    category: 'naturaleza',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    author: 'John Doe',
    date: Date.now() - 86400000 * 1,
  },
  {
    id: 2,
    title: 'Ciudad de noche',
    category: 'ciudad',
    url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800',
    author: 'Jane Smith',
    date: Date.now() - 86400000 * 2,
  },
  {
    id: 3,
    title: 'Retrato urbano',
    category: 'personas',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    author: 'Mike Johnson',
    date: Date.now() - 86400000 * 3,
  },
  {
    id: 4,
    title: 'Gato dormido',
    category: 'animales',
    url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800',
    author: 'Sarah Wilson',
    date: Date.now() - 86400000 * 4,
  },
  {
    id: 5,
    title: 'Bosque neblinoso',
    category: 'naturaleza',
    url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800',
    author: 'Alex Brown',
    date: Date.now() - 86400000 * 5,
  },
  {
    id: 6,
    title: 'Rascacielos modernos',
    category: 'ciudad',
    url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800',
    author: 'Chris Lee',
    date: Date.now() - 86400000 * 6,
  },
  {
    id: 7,
    title: 'Mujer sonriente',
    category: 'personas',
    url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800',
    author: 'Emma Davis',
    date: Date.now() - 86400000 * 7,
  },
  {
    id: 8,
    title: 'Perro en el parque',
    category: 'animales',
    url: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=800',
    author: 'Tom Harris',
    date: Date.now() - 86400000 * 8,
  },
  {
    id: 9,
    title: 'Cascada tropical',
    category: 'naturaleza',
    url: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800',
    author: 'Lisa Martinez',
    date: Date.now() - 86400000 * 9,
  },
  {
    id: 10,
    title: 'Puente colgante',
    category: 'ciudad',
    url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800',
    author: 'David Clark',
    date: Date.now() - 86400000 * 10,
  },
  {
    id: 11,
    title: 'Grupo de amigos',
    category: 'personas',
    url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800',
    author: 'Anna White',
    date: Date.now() - 86400000 * 11,
  },
  {
    id: 12,
    title: 'Loro colorido',
    category: 'animales',
    url: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800',
    author: 'Paul Green',
    date: Date.now() - 86400000 * 12,
  },
];