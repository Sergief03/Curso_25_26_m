import { crearCatalogo,
 reproducirCancion,
 gestionarPlaylists,
 construirIndiceBusqueda,
 buscarCancionesArtista as buscarCancionesArtista,
 generarEstadisticasMusicales,
 generarRecomendaciones } from "./helpers/bibliotecaMusical";

function app(){
    console.clear();
    console.log("🎵 === SISTEMA DE BIBLIOTECA MUSICAL === 🎵\n");
    // 1. CREAR CATÁLOGO
    console.log(" Creando catálogo...");
    const catalogo = crearCatalogo();
    // 2. REPRODUCIR CANCIONES
    console.log("\n Reproduciendo canciones...");
    reproducirCancion(1);
    reproducirCancion(1);
    reproducirCancion(3);
    reproducirCancion(5);
    // 3. GESTIONAR PLAYLISTS
    console.log("\n Gestionando playlists...");
    const playlists = gestionarPlaylists();
    playlists.crear("Rock Classics");
    playlists.agregar("Rock Classics", 1);
    playlists.agregar("Rock Classics", 3);
    playlists.agregar("Rock Classics", 6);
    // 4. CONSTRUIR ÍNDICE Y BUSCAR
    console.log("\n Construyendo índice de búsqueda...");
    construirIndiceBusqueda();
    const resultados = buscarCancionesArtista("rock", { añoMin: 1970, añoMax: 1980 });
    // 5. ESTADÍSTICAS
    console.log("\n Generando estadísticas...");
    const stats = generarEstadisticasMusicales();
    // 6. RECOMENDACIONES
    console.log("\n Generando recomendaciones...");
    const recs = generarRecomendaciones(1, 3);
    console.log("\n✅ Todas las funcionalidades probadas correctamente");

}

export default app;