import Database from "better-sqlite3";

const db = new Database('./data/carrito.db');
db.pragma("foreign_keys = ON");

// Tabla producto
db.prepare(`
    CREATE TABLE IF NOT EXISTS producto (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT UNIQUE NOT NULL,
        precio REAL NOT NULL,
        descripcion TEXT
    );
`).run();

// Tabla carrito
db.prepare(`
    CREATE TABLE IF NOT EXISTS carrito (
        id INTEGER PRIMARY KEY AUTOINCREMENT
    );
`).run();

// Tabla linea_carrito
db.prepare(`
    CREATE TABLE IF NOT EXISTS linea_carrito (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_producto INTEGER NOT NULL,
        id_carrito INTEGER NOT NULL,
        cantidad INTEGER NOT NULL,
        precio_unitario REAL NOT NULL,
        FOREIGN KEY (id_producto) REFERENCES producto(id),
        FOREIGN KEY (id_carrito) REFERENCES carrito(id)
    );
`).run();

// Array de productos
const productos = [
    ["Auriculares Bluetooth", 29.99, "Auriculares inalámbricos con micro integrado"],
    ["Teclado Mecánico", 69.90, "Teclado mecánico RGB con switches rojos"],
    ["Ratón Gamer", 24.50, "Ratón ergonómico 7200 DPI con iluminación LED"],
    ["Monitor 24 pulgadas", 149.99, "Monitor IPS Full HD de 24 pulgadas"],
    ["Cargador USB-C 30W", 19.95, "Cargador rápido compatible con PD 3.0"],
    ["Disco SSD 500GB", 45.00, "SSD NVMe M.2 de alta velocidad"],
    ["Altavoz portátil", 34.99, "Altavoz Bluetooth resistente al agua IPX7"],
    ["Silla gaming", 159.00, "Silla ergonómica con soporte lumbar"],
    ["Webcam HD", 39.90, "Webcam 1080p con micrófono integrado"],
    ["Smartwatch básico", 49.99, "Reloj inteligente con monitor de actividad"]
];

// Insert preparado
const insert = db.prepare(`
    INSERT OR IGNORE INTO producto (nombre, precio, descripcion)
    VALUES (?, ?, ?)
`);

// Ejecutar inserts
for (const p of productos) {
    insert.run(...p);
}

export default db;
