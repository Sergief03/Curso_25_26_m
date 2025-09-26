/*
Gestion bancaria Revolut 

Desarrolla un sistema bancario básico que permita realizar las siguientes operaciones:
- Crear cuentas bancarias, generando un número de cuenta aleatorio de 24 dígitos.
- Depositar y retirar dinero de una cuenta, asegurando que no se pueda retirar más saldo del disponible.
- Consultar el saldo de una cuenta.
- Transferir dinero entre cuentas.
- Mantener un listado de todas las cuentas creadas.
- Buscar cuentas por el nombre del titular.

Implementa una función de prueba (test) que verifique todas las funcionalidades anteriores.
*/

const cuentas = [];

/**
 * Genera un número de cuenta aleatorio de 24 dígitos
 * @returns {string} - Numero de cuenta aleatorio de 24 digitos
 */
function generarNumeroCuenta() {
    let numeroCuenta = '';
    for (let i = 0; i < 24; i++) {
        numeroCuenta += Math.floor(Math.random() * 10);
    }
    return numeroCuenta;
}

/**
 * Crear una nueva cuenta bancaria
 * @param {string} nombreTitular - Nombre del titular de la cuenta
 * @returns {string} - Numero de cuenta creada
 */
function crearCuenta(nombreTitular) {
    let cuenta = {
        numeroCuenta: generarNumeroCuenta(),
        nombreTitular: nombreTitular,
        saldo: 0
    };
    cuentas.push(cuenta);
    return cuenta.numeroCuenta;
}

/**
 * Buscar cuentas por el nombre del titular
 * @param {string} nombreTitular - Nombre del titular de la cuenta
 * @returns {Array} - Lista de cuentas encontradas
 */
function buscarCuentas(nombreTitular) {
    let cuentasBuscadas = [];
    for (let i = 0; i < cuentas.length; i++) {
        if (cuentas[i].nombreTitular === nombreTitular) {
            cuentasBuscadas.push(cuentas[i]);
        }
    }
    if (cuentasBuscadas.length === 0) {
        console.warn("No se han encontrado cuentas para el titular " + nombreTitular);
    }
    return cuentasBuscadas;
}

/**
 * Consulta el saldo de una cuenta bancaria 
 * @param {string} nombreTitular - Nombre del titular de la cuenta
 * @param {string} numeroCuenta - Número de la cuenta
 * @returns {number|null} - Saldo de la cuenta o null si no se encuentra la cuenta
 */
function consultarSaldo(nombreTitular, numeroCuenta) {
    let cuentasEncontradas = buscarCuentas(nombreTitular);
    for (let i = 0; i < cuentasEncontradas.length; i++) {
        if (cuentasEncontradas[i].numeroCuenta === numeroCuenta) {
            return cuentasEncontradas[i].saldo;
        }
    }
    console.error("No se encontró la cuenta " + numeroCuenta + " de " + nombreTitular);
    return null;
}

/**
 * Depositar dinero en una cuenta bancaria
 * @param {string} nombreTitular - Nombre del titular de la cuenta
 * @param {string} numeroCuenta - Número de la cuenta
 * @param {number} cantidad - Cantidad a depositar
 * @returns {number|null} - Nuevo saldo de la cuenta o null si no se encuentra la cuenta
 */
function depositar(nombreTitular, numeroCuenta, cantidad) {
    if (cantidad <= 0) {
        console.error("La cantidad a depositar debe ser mayor que cero");
        return null;
    }
    let cuentasEncontradas = buscarCuentas(nombreTitular);
    for (let i = 0; i < cuentasEncontradas.length; i++) {
        if (cuentasEncontradas[i].numeroCuenta === numeroCuenta) {
            cuentasEncontradas[i].saldo += cantidad;
            return cuentasEncontradas[i].saldo;
        }
    }
    console.error("No se encontró la cuenta " + numeroCuenta + " de " + nombreTitular);
    return null;
}

/**
 * Retirar dinero de una cuenta bancaria
 * @param {string} nombreTitular - Nombre del titular de la cuenta
 * @param {string} numeroCuenta - Número de la cuenta
 * @param {number} cantidad - Cantidad a retirar
 * @returns {number|null} - Nuevo saldo de la cuenta o null si no se encuentra la cuenta
 */
function retirar(nombreTitular, numeroCuenta, cantidad) {
    if (cantidad <= 0) {
        console.error("La cantidad a retirar debe ser mayor que cero");
        return null;
    }
    let cuentasEncontradas = buscarCuentas(nombreTitular);
    for (let i = 0; i < cuentasEncontradas.length; i++) {
        if (cuentasEncontradas[i].numeroCuenta === numeroCuenta) {
            if (cantidad > cuentasEncontradas[i].saldo) {
                console.error("No hay saldo suficiente");
                return null;
            }
            cuentasEncontradas[i].saldo -= cantidad;
            return cuentasEncontradas[i].saldo;
        }
    }
    console.error("No se encontró la cuenta " + numeroCuenta + " de " + nombreTitular);
    return null;
}

/**
 * Transferir dinero entre cuentas bancarias
 * @param {string} nombreTitularOrigen - Nombre del titular de la cuenta de origen
 * @param {string} numeroCuentaOrigen - Número de la cuenta de origen
 * @param {string} nombreTitularDestino - Nombre del titular de la cuenta de destino
 * @param {string} numeroCuentaDestino - Número de la cuenta de destino
 * @param {number} cantidad - Cantidad a transferir
 * @returns {object|null} - Objeto con los saldos actualizados o null si hay un error
 */
function transferir(nombreTitularOrigen, numeroCuentaOrigen, nombreTitularDestino, numeroCuentaDestino, cantidad) {
    if (cantidad <= 0) {
        console.error("La cantidad a transferir debe ser mayor que cero");
        return null;
    }

    let cuentaOrigen = null;
    let cuentaDestino = null;

    let cuentasOrigen = buscarCuentas(nombreTitularOrigen);
    for (let i = 0; i < cuentasOrigen.length; i++) {
        if (cuentasOrigen[i].numeroCuenta === numeroCuentaOrigen) {
            cuentaOrigen = cuentasOrigen[i];
        }
    }

    let cuentasDestino = buscarCuentas(nombreTitularDestino);
    for (let i = 0; i < cuentasDestino.length; i++) {
        if (cuentasDestino[i].numeroCuenta === numeroCuentaDestino) {
            cuentaDestino = cuentasDestino[i];
        }
    }

    if (cuentaOrigen === null) {
        console.error("No se encontró la cuenta origen");
        return null;
    }
    if (cuentaDestino === null) {
        console.error("No se encontró la cuenta destino");
        return null;
    }
    if (cantidad > cuentaOrigen.saldo) {
        console.error("No hay saldo suficiente en la cuenta de origen");
        return null;
    }

    cuentaOrigen.saldo -= cantidad;
    cuentaDestino.saldo += cantidad;

    return {
        saldoOrigen: cuentaOrigen.saldo,
        saldoDestino: cuentaDestino.saldo
    };
}

/**
 * Listar todas las cuentas bancarias
 * @returns {Array} - Listado de todas las cuentas creadas
 */
function listarCuentas() {
    return cuentas;
}

/**
 * Función de prueba para verificar todas las funcionalidades del sistema bancario
 */
function testSistemaBancario() {
    console.log("=== TEST SISTEMA BANCARIO ===");

    // Crear cuentas
    let cuenta1 = crearCuenta("Sergio");
    let cuenta2 = crearCuenta("Ana");

    console.log("Cuentas creadas:");
    console.log(listarCuentas());

    // Depositar dinero
    depositar("Sergio", cuenta1, 1000);
    depositar("Ana", cuenta2, 500);

    console.log("Después de depósitos:");
    console.log(listarCuentas());

    // Retirar dinero
    retirar("Sergio", cuenta1, 200);

    console.log("Después de retirar 200 de Sergio:");
    console.log(listarCuentas());

    // Consultar saldo
    console.log("Saldo de Ana:", consultarSaldo("Ana", cuenta2));

    // Transferir dinero
    transferir("Sergio", cuenta1, "Ana", cuenta2, 300);

    console.log("Después de transferir 300 de Sergio a Ana:");
    console.log(listarCuentas());

    // Buscar cuentas
    console.log("Buscar cuentas de Sergio:", buscarCuentas("Sergio"));
    console.log("Buscar cuentas de Ana:", buscarCuentas("Ana"));
    console.log("Buscar cuentas de Pepe:", buscarCuentas("Pepe"));
}

// Ejecutar test
testSistemaBancario();