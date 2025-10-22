import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

// ------------------ UTILIDADES ------------------

/**
 * Convierte un string JSON a un Map de forma segura.
 * @param {string} string - Cadena JSON serializada de un Map
 * @returns {Map} Map con los datos o vacío en caso de error
 */
const parseMap = (string) => {
  try {
    const arr = JSON.parse(string);
    return new Map(arr);
  } catch (error) {
    console.error("❌ Error parseando Map:", error.message);
    return new Map();
  }
};

/**
 * Convierte un Map a string JSON.
 * @param {Map} map - Mapa a convertir
 * @returns {string} JSON serializado
 */
const stringifyMap = (map) => JSON.stringify(Array.from(map));

// ------------------ VALIDACIONES ------------------

/**
 * Valida el username.
 * @param {string} username
 * @returns {{ valid: boolean, message?: string }}
 */
const validarUsername = (username) => {
  const regexUser = /^[a-zA-Z0-9_]{3,}$/;
  if (!username || !regexUser.test(username)) {
    return {
      valid: false,
      message:
        "⚠️ El username debe tener al menos 3 caracteres y solo puede contener letras, números o guiones bajos",
    };
  }
  return { valid: true };
};

/**
 * Valida la contraseña.
 * @param {string} password
 * @returns {{ valid: boolean, message?: string }}
 */
const validarPassword = (password) => {
  if (!password || password.length < 6) {
    return {
      valid: false,
      message: "⚠️ La contraseña debe tener al menos 6 caracteres",
    };
  }
  return { valid: true };
};

// ------------------ FUNCIONES PRINCIPALES ------------------

/**
 * Registra un nuevo usuario en localStorage.
 * @param {string} username - Nombre de usuario
 * @param {string} password - Contraseña en texto plano
 * @param {string} [tipo="normal"] - Tipo de usuario
 * @returns {{ success: boolean, message: string }}
 */
export const registrarUsuario = (username, password, tipo = "normal") => {
  try {
    const dbUsuarios = parseMap(localStorage.getItem(`Usuarios${tipo}`));

    // Validaciones
    let res = validarUsername(username);
    if (!res.valid) return { success: false, message: res.message };

    res = validarPassword(password);
    if (!res.valid) return { success: false, message: res.message };

    if (dbUsuarios.has(username)) {
      return { success: false, message: "⚠️ El username ya existe" };
    }

    const nuevoUsuario = {
      id: uuidv4(),
      username,
      passwordHash: bcrypt.hashSync(password, 10),
      fechaRegistro: new Date().toISOString(),
    };

    dbUsuarios.set(username, nuevoUsuario);
    localStorage.setItem(`Usuarios${tipo}`, stringifyMap(dbUsuarios));

    console.log(`✅ Usuario "${username}" registrado correctamente`);
    return { success: true, message: "Usuario registrado correctamente" };
  } catch (error) {
    console.error("❌ Error en registrarUsuario:", error.message);
    return { success: false, message: "Error interno al registrar usuario" };
  }
};

/**
 * Login de usuario.
 * @param {string} username
 * @param {string} password
 * @param {string} [tipo="normal"]
 * @returns {{ success: boolean, message: string, usuario?: object }}
 */
export const loginUsuario = (username, password, tipo = "normal") => {
  try {
    const dbUsuarios = parseMap(localStorage.getItem(`Usuarios${tipo}`));
    const user = dbUsuarios.get(username);

    if (!user) return { success: false, message: "⚠️ Usuario no encontrado" };

    if (!bcrypt.compareSync(password, user.passwordHash)) {
      return { success: false, message: "⚠️ Contraseña incorrecta" };
    }

    console.log(`🔑 Login correcto para usuario: ${username}`);
    return { success: true, message: "Login correcto", usuario: user };
  } catch (error) {
    console.error("❌ Error en loginUsuario:", error.message);
    return { success: false, message: "Error interno en login" };
  }
};

/**
 * Cambiar contraseña de un usuario.
 * @param {string} username
 * @param {string} passwordActual
 * @param {string} passwordNueva
 * @param {string} [tipo="normal"]
 * @returns {{ success: boolean, message: string }}
 */
export const cambiarPassword = (
  username,
  passwordActual,
  passwordNueva,
  tipo = "normal"
) => {
  try {
    const dbUsuarios = parseMap(localStorage.getItem(`Usuarios${tipo}`));
    const user = dbUsuarios.get(username);

    if (!user) return { success: false, message: "⚠️ Usuario no existe" };

    if (!bcrypt.compareSync(passwordActual, user.passwordHash)) {
      return { success: false, message: "⚠️ Contraseña actual incorrecta" };
    }

    const res = validarPassword(passwordNueva);
    if (!res.valid) return { success: false, message: res.message };

    user.passwordHash = bcrypt.hashSync(passwordNueva, 10);
    dbUsuarios.set(username, user);

    localStorage.setItem(`Usuarios${tipo}`, stringifyMap(dbUsuarios));

    console.log(`🔒 Contraseña cambiada para usuario: ${username}`);
    return { success: true, message: "Contraseña cambiada exitosamente" };
  } catch (error) {
    console.error("❌ Error en cambiarPassword:", error.message);
    return { success: false, message: "Error interno al cambiar contraseña" };
  }
};

/**
 * Listar usuarios almacenados.
 * @param {string} [tipo="normal"]
 * @returns {Map} Mapa con los usuarios
 */
export const listarUsuarios = (tipo = "normal") => {
  try {
    return parseMap(localStorage.getItem(`Usuarios${tipo}`));
  } catch (error) {
    console.error("❌ Error en listarUsuarios:", error.message);
    return new Map();
  }
};

/**
 * Eliminar un usuario.
 * @param {string} username
 * @param {string} password
 * @param {string} [tipo="normal"]
 * @returns {{ success: boolean, message: string }}
 */
export const eliminarUsuario = (username, password, tipo = "normal") => {
  try {
    const dbUsuarios = parseMap(localStorage.getItem(`Usuarios${tipo}`));
    const user = dbUsuarios.get(username);

    if (!user) return { success: false, message: "⚠️ Usuario no encontrado" };

    if (!bcrypt.compareSync(password, user.passwordHash)) {
      return { success: false, message: "⚠️ Contraseña incorrecta" };
    }

    dbUsuarios.delete(username);
    localStorage.setItem(`Usuarios${tipo}`, stringifyMap(dbUsuarios));

    console.log(`🗑️ Usuario eliminado: ${username}`);
    return { success: true, message: "Usuario eliminado correctamente" };
  } catch (error) {
    console.error("❌ Error en eliminarUsuario:", error.message);
    return { success: false, message: "Error interno al eliminar usuario" };
  }
};
