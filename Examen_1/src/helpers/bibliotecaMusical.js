import { canciones } from "../db/data";

export const crearCatalogo=()=>{
    const catalogo=new Map();
    canciones.forEach(cancion=>{
        const cancionCompleta={
            ...cancion,
            historialReproduccion:[]
        }
        catalogo.set(cancion.id,cancionCompleta);
    });

    guardarMapLocalStorage('catalogo',catalogo);
    console.log(`Catalogo creado con ${catalogo.size}`);
    return catalogo;
}

export function reproducirCancion(idCancion){
    const catalogo=cargarMapLocalStorage('catalogo');
    if(!catalogo.has(idCancion)){
        throw new Error(`La cancion con id ${idCancion} no existe`);
    }
    const cancionReproducida=catalogo.get(idCancion);
    cancionReproducida.reproducciones++;
    cancionReproducida.historialReproduccion.push({
        fecha:new Date().toISOString(),
        timestamp:Date.now()
    })
    catalogo.set(idCancion,cancionReproducida)
    guardarMapLocalStorage('catalogo',catalogo);
    console.log(`Reproduciendo: ${cancionReproducida.titulo}----${cancionReproducida.artista}`);
    console.log(`Cancion reproducida:${cancionReproducida.reproducciones} veces`)
    return cancionReproducida;
}

const guardarMapLocalStorage=(clave,map)=>{
    // const array=Array.from(map,([clave,valor])=>({clave,valor}));
    // return localStorage.setItem('catalogo',JSON.stringify(array));
    const array=Array.from(map);
    localStorage.setItem(clave,JSON.stringify(array));
}

const cargarMapLocalStorage=(clave)=>{
    const datos=localStorage.getItem(clave);
    return datos
    ? new Map(JSON.parse(datos))
    : new Map()
}

export function gestionarPlaylists(){
    const guardarPlaylistsLocalStorage = (map) => {
        const array = Array.from(map, ([nombre, setIds]) => [nombre, Array.from(setIds)]);
        localStorage.setItem("playlists", JSON.stringify(array));
        // const array=[]
        // map.forEach((setCanciones,nombre)=>{
        //     array.push([nombre,Array.from(setCanciones)])
        // })
    };

    const cargarPlaylistsLocalStorage = () => {
    const datos = localStorage.getItem("playlists");
    return datos
        ? new Map(JSON.parse(datos).map(([nombre, arrayIds]) => [nombre, new Set(arrayIds)]))
        : new Map();
    };

    const crear = (nombrePlaylist) => {
    const playlists = cargarPlaylistsLocalStorage();

    if (playlists.has(nombrePlaylist)) {
        return false;
    }

    playlists.set(nombrePlaylist, new Set());

    guardarPlaylistsLocalStorage(playlists);

    return true;
    };

    
    const agregar = (nombrePlaylist, idCancion) => {
    const playlists = cargarPlaylistsLocalStorage();

    if (!playlists.has(nombrePlaylist)) {
        return false;
    }

    const catalogo = cargarMapLocalStorage("catalogo");

    if (!catalogo.has(idCancion)) {
        return false;
    }

    const setCanciones = playlists.get(nombrePlaylist);

    if (setCanciones.has(idCancion)) {
        return false;
    }

    setCanciones.add(idCancion);
    playlists.set(nombrePlaylist, setCanciones);
    guardarPlaylistsLocalStorage(playlists);

    return true;
    };

    const eliminar=(nombrePlaylist,idCancion)=>{
        const playlists = cargarPlaylistsLocalStorage();

        if (!playlists.has(nombrePlaylist)) {
            return false;
        }

        playlists.get(nombrePlaylist).delete(idCancion);

        guardarPlaylistsLocalStorage(playlists);
        return true;
    }

    const obtener=(nombrePlaylist)=>{
        const playlists = cargarPlaylistsLocalStorage();

        if (!playlists.has(nombrePlaylist)) {
            return false;
        }

        const idCanciones=Array.from(playlists.get(nombrePlaylist));
       
        const catalogo=cargarMapLocalStorage('catalogo');

        const canciones=[];

        idCanciones.forEach(id=>canciones.push(catalogo.get(id)))

        return canciones;
    }

    const listar=()=>Array.from(cargarPlaylistsLocalStorage().keys());
    

    return {
        crear,
        agregar,
        eliminar,
        obtener,
        listar,
    }
}

export function construirIndiceBusqueda(){
    const catalogo=cargarMapLocalStorage('catalogo');

    const indice=new Map();

    const guardarIndice = (arrayI, id) => {
        arrayI.forEach(texto => {
            if (!texto) return; // Evita errores con valores nulos
            texto.toLowerCase().split(' ').forEach(palabra => {
                if (!indice.has(palabra)) {
                    indice.set(palabra, new Set());
                }
                indice.get(palabra).add(id);
            });
        });
    };


    catalogo.forEach((cancion,id)=>{
        const { titulo, artista, album, genero, año }=cancion;

        guardarIndice([titulo,artista,album,genero,año.toString()],id);
        
    })

    const arrayIndice=Array.from(indice,([palabra,indiceSet])=>([palabra,Array.from(indiceSet)]));
    localStorage.setItem('indiceBusqueda',JSON.stringify(arrayIndice));

    return indice;
}

// Crear una funcion que le pase como parametro max o min y obtenga ordenadas por el nombre las 5 cancniones mas o menos reproducidas
// Crear una funcion que le pase como parametro artista y me devuelva el nombre de todas las canciones que tiene
// Crear una funcion reset que ponga todos los contadores de las canciones a 0
// Crear una funcion totalReproducciones que obtenga el total de reproducciones de mi catalogo musical

export function buscarCancionesArtista(artista){
    return Array.from(cargarMapLocalStorage('catalogo').values()).filter(cancion=>cancion.artista===artista);
}

export function cancionesReproducidadRango(masOMenosEscuchadas){
    const reeproducciones=Array.from(cargarMapLocalStorage('catalogo').values())
    .sort((a,b)=>b.reproducciones-a.reproducciones);

    return masOMenosEscuchadas? reeproducciones.slice(0,5):reeproducciones.slice(-5);
}

export function reset(){
    return Array.from(cargarMapLocalStorage('catalogo').values()).map(cancion => {
        cancion.reproducciones=0;
    });
}

export function totalReproducciones(){
    return Array.from(cargarMapLocalStorage('catalogo').values()).reduce((acc,cancion)=> acc+=cancion.reproducciones,0)
}

function buscarCanciones(termino,filtros={}){
    const storage=localStorage.getItem("indiceBusqueda")
    const indice=storage
    ? new Map(JSON.parse(storage).map(([palabra,arrayId])=>([palabra,new Set(arrayId)])))
    : new Map();

    const catalogo=cargarMapLocalStorage('catalogo');
    const canciones=[]
    indice.get(termino.toLowerCase())?.forEach(id=> canciones.push(catalogo.get(id)));

    return canciones.filter(cancion=>{
        const genero=!filtros.genero || filtros.genero===cancion.genero;
        const añoMin=!filtros.añoMin || filtros.añoMin<=cancion.año;
        const añoMax=!filtros.añoMax || filtros.añoMax>=cancion.año;
        const duracionMax= !filtros.duracionMax || filtros.duracionMax>=cancion.duracion

        return genero && añoMin && añoMax && duracionMax
    })
    .sort((a,b)=>a.reproducciones-b.reproducciones);
}

export function generarEstadisticasMusicales(){
    const catalogo=cargarMapLocalStorage('catalogo');


    const totalCanciones=catalogo.size;

    const duracionTotal=[...catalogo.values()].reduce((acc,cancion)=>acc+cancion.reproducciones,0);

    const cancionMasReproducida=[...catalogo.values()].sort((a,b)=>b.reproducciones-a.reproducciones).slice(0,1);

    const generosPorCantidad=Object.fromEntries(Object.entries([...catalogo.values()].reduce((acc,c)=>( (acc[c.genero] = (acc[c.genero] ?? 0) + 1),acc),{})).sort((a,b)=>b[1]-a[1]));

    const artistasUnicos=[...new Set([...catalogo.values()].map(cancion=>cancion.artista))];

    const añoPromedio= [...catalogo.values()].reduce((acc,cancion)=>acc+cancion.año,0) / [...catalogo.values()].length;

    const distribucionDecadas=[...catalogo.values()].reduce((acc,c)=>{
        const decada = Math.floor(c.año/10)*10+"s";
        acc[decada]=(acc[decada]??0)+1;
        return acc;
    },{})

    return {
        totalCanciones,
        duracionTotal,
        cancionMasReproducida,
        generosPorCantidad,
        artistasUnicos,
        añoPromedio,
        distribucionDecadas
    }
};

export function generarRecomendaciones(idCancionBase, cantidad = 3) {
  // 1️⃣ Recuperar el catálogo desde LocalStorage
  const catalogo = cargarMapLocalStorage('catalogo');

  // 2️⃣ Validar que la canción base exista
  const cancionBase = catalogo.get(idCancionBase);
  if (!cancionBase) {
    console.error("❌ La canción base no existe en el catálogo.");
    return [];
  }

  const recomendaciones = Array.from(catalogo.values())
    .filter(c => c.id !== idCancionBase)
    .map(c => {
      let puntuacion = 0;
      const razones = [];

      if (c.artista === cancionBase.artista) {
        puntuacion += 5;
        razones.push("Mismo artista");
      }

      if (c.genero === cancionBase.genero) {
        puntuacion += 3;
        razones.push("Mismo género");
      }

      if (Math.abs(c.año - cancionBase.año) <= 5) {
        puntuacion += 2;
        razones.push("Año de lanzamiento similar (±5 años)");
      }

      if (Math.abs(c.duracion - cancionBase.duracion) <= 60) {
        puntuacion += 1;
        razones.push("Duración similar (±60 segundos)");
      }

      return { cancion: c, puntuacion, razones };
    })
    .sort((a, b) => b.puntuacion - a.puntuacion)
    .slice(0, cantidad);

    console.log("Si te gustó 'Bohemian Rhapsody', te recomendamos:\n");
    recomendaciones.forEach((rec, index) => {
    console.log(`${index + 1}. ${rec.cancion.titulo} -
    ${rec.cancion.artista}`);
    console.log(` Puntuación: ${rec.puntuacion} puntos`);
    console.log(` Razones: ${rec.razones.join(", ")}`);
    console.log();
    })

  return recomendaciones;
}
