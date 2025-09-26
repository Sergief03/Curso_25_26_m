//Primer ejercicio de javascript 

/**
 * Suma dos números y devuelve el resultado.
 * @param {number} [a=0] - El primer número a sumar con valor por defecto 0.
 * @param {number} [b=0] - El segundo número a sumar con valor por defecto 0.
 * @returns {number} - La suma de los dos números.
 */
function suma(a=0, b=0) {
    return a + b;
}

console.log(`La suma de 2+3 es ${suma(2,3)}`);
console.log(suma(2));
console.log(suma());