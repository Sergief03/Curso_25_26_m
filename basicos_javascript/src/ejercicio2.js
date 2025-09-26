/*
Crear un juego de un dado que utilizando una funcion llamada tirarDado, que permita tirar un dado 
con caras del uno al seis.
Crear una funcion llamada simular que le pase como parametro el numero de tiradas y me diga que numero
se ha repetido mas veces.
*/

/**
 * Funcion para tirar un dado de 6 caras.
 * @returns {number} - Numero aleatorio entre 1 y 6
 */
function tirarDado() {
    return Math.floor(Math.random() * 6)+1 ;
}

/**
 * 
 * @param {number} numTiradas - Numero de tiradas a simular
 * @returns {number} - Numero que mas se ha repetido
 */
function simular(numTiradas) { 
    const resultados = [0,0,0,0,0,0];
    for (let i=0;i<numTiradas;i++) {
        let tirada = tirarDado();
        resultados[tirada-1]++;
    }
    return resultados.indexOf(Math.max(...resultados))+1;
}

console.log(simular(1000));