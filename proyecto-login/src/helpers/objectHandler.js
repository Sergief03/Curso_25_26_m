import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

// ------------------ UTILIDADES ------------------

/**
 * Convierte string a JSON de forma segura.
 * @param {string} string - Cadena a parsear
 * @returns {Object} Objeto JSON o {}
 */
const parseJSON = (string) => {
  try {
    return JSON.parse(String(string).trim());
  } catch (error) {
    console.error("❌ Error parseando JSON:", error.message);
    return {};
  }
};

/**
 * Convierte un objeto JSON a string.
 * @param {Object} json - Objeto a convertir
 * @returns {string} Cadena JSON
 */
const stringifyJSON = (json) => JSON.stringify(json);

// ------------------ VALIDACIONES ------------------

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
 * Registra un nuevo usuario en localStorage
 * @param {string} username - Nombre de usuario
 * @param {string} password - Contraseña
 * @param {string} [tipo="normal"] - Tipo de usuario
 * @returns {Object} Resultado { success, message }
 */
export const registrarUsuario = (username, password, tipo = "normal") => {
  try {
    const dbUsuarios = parseJSON(localStorage.getItem(`Usuarios${tipo}`)) ?? {};

    // Validaciones
    let res = validarUsername(username);
    if (!res.valid) return { success: false, message: res.message };

    res = validarPassword(password);
    if (!res.valid) return { success: false, message: res.message };

    // Verificar duplicado
    if (dbUsuarios[username]) {
      return { success: false, message: "⚠️ El username ya existe" };
    }

    // Crear usuario
    dbUsuarios[username] = {
      id: uuidv4(),
      username,
      passwordHash: bcrypt.hashSync(password, 10),
      fechaRegistro: new Date().toISOString(),
    };

    localStorage.setItem(`Usuarios${tipo}`, stringifyJSON(dbUsuarios));

    console.log(`✅ Usuario "${username}" registrado correctamente`);
    return { success: true, message: "Usuario registrado correctamente" };
  } catch (error) {
    console.error("❌ Error registrando usuario:", error.message);
    return { success: false, message: "Error interno al registrar usuario" };
  }
};

/**
 * Login de usuario
 */
export const loginUsuario = (username, password, tipo = "normal") => {
  try {
    const dbUsuarios = parseJSON(localStorage.getItem(`Usuarios${tipo}`)) ?? {};
    const user = dbUsuarios[username];

    if (!user) return { success: false, message: "⚠️ Usuario no encontrado" };

    if (!bcrypt.compareSync(password, user.passwordHash)) {
      return { success: false, message: "⚠️ Contraseña incorrecta" };
    }

    console.log(`🔑 Login correcto: ${username}`);
    return { success: true, message: "Login correcto", usuario: user };
  } catch (error) {
    console.error("❌ Error en login:", error.message);
    return { success: false, message: "Error interno en login" };
  }
};

/**
 * Cambiar contraseña de un usuario
 */
export const cambiarPassword = (
  username,
  passwordActual,
  passwordNueva,
  tipo = "normal"
) => {
  try {
    const dbUsuarios = parseJSON(localStorage.getItem(`Usuarios${tipo}`)) ?? {};
    const user = dbUsuarios[username];

    if (!user) return { success: false, message: "⚠️ Usuario no existe" };

    if (!bcrypt.compareSync(passwordActual, user.passwordHash)) {
      return { success: false, message: "⚠️ Contraseña actual incorrecta" };
    }

    const res = validarPassword(passwordNueva);
    if (!res.valid) return { success: false, message: res.message };

    user.passwordHash = bcrypt.hashSync(passwordNueva, 10);
    dbUsuarios[username] = user;

    localStorage.setItem(`Usuarios${tipo}`, stringifyJSON(dbUsuarios));

    console.log(`🔒 Contraseña cambiada para: ${username}`);
    return { success: true, message: "Contraseña cambiada exitosamente" };
  } catch (error) {
    console.error("❌ Error cambiando contraseña:", error.message);
    return { success: false, message: "Error interno al cambiar contraseña" };
  }
};

/**
 * Listar usuarios
 */
export const listarUsuarios = (tipo = "normal") => {
  try {
    return parseJSON(localStorage.getItem(`Usuarios${tipo}`)) ?? {};
  } catch (error) {
    console.error("❌ Error listando usuarios:", error.message);
    return {};
  }
};

/**
 * Eliminar un usuario
 */
export const eliminarUsuario = (username, password, tipo = "normal") => {
  try {
    const dbUsuarios = parseJSON(localStorage.getItem(`Usuarios${tipo}`)) ?? {};
    const user = dbUsuarios[username];

    if (!user) return { success: false, message: "⚠️ Usuario no encontrado" };

    if (!bcrypt.compareSync(password, user.passwordHash)) {
      return { success: false, message: "⚠️ Contraseña incorrecta" };
    }

    delete dbUsuarios[username];
    localStorage.setItem(`Usuarios${tipo}`, stringifyJSON(dbUsuarios));

    console.log(`🗑️ Usuario eliminado: ${username}`);
    return { success: true, message: "Usuario eliminado correctamente" };
  } catch (error) {
    console.error("❌ Error eliminando usuario:", error.message);
    return { success: false, message: "Error interno al eliminar usuario" };
  }
};
