import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

// ------------------ UTILIDADES ------------------

/**
 * Parsea una cadena JSON de forma segura.
 * @param {string|null|undefined} string - Cadena JSON (puede ser null/undefined)
 * @returns {any|null} - Valor parseado (Array/Object/primitive) o null si no existe o falla el parseo
 */
const parseJSON = (string) => {
  try {
    if (string === null || string === undefined) return null;
    return JSON.parse(String(string).trim());
  } catch (error) {
    console.error("❌ Error parseando JSON:", error.message);
    return null;
  }
};

/**
 * Serializa un valor a JSON string.
 * @param {any} json - Objeto o array a serializar
 * @returns {string} - Cadena JSON
 */
const stringifyJSON = (json) => JSON.stringify(json);

// ------------------ VALIDACIONES ------------------

/**
 * Valida que el username cumpla con el formato requerido.
 * @param {string} username
 * @returns {{valid: boolean, message?: string}}
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
 * Valida un email (es opcional).
 * @param {string|null|undefined} email
 * @returns {{valid: boolean, message?: string}}
 */
const validarEmail = (email) => {
  if (!email) return { valid: true }; // email opcional
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(email)) {
    return { valid: false, message: "⚠️ El email no es válido" };
  }
  return { valid: true };
};

/**
 * Valida la contraseña (mínimo 6 caracteres).
 * @param {string} password
 * @returns {{valid: boolean, message?: string}}
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

/**
 * Comprueba unicidad de username y (si existe) email en la base de datos.
 * @param {string} username
 * @param {string|null|undefined} email
 * @param {Array<Object>} dbUsuarios - Array de usuarios
 * @returns {{valid: boolean, message?: string}}
 */
const validarUnique = (username, email, dbUsuarios) => {
  const existe = dbUsuarios.find(
    (u) => u.username === username || (email && u.email === email)
  );
  if (existe) {
    return { valid: false, message: "⚠️ El username o email ya existe" };
  }
  return { valid: true };
};

// ------------------ FUNCIONES PRINCIPALES ------------------

/**
 * Registra un nuevo usuario.
 * @param {string} username - Nombre de usuario
 * @param {string|null} email - Email (opcional)
 * @param {string} password - Contraseña en texto plano
 * @param {string} [tipo="normal"] - Tipo de almacenamiento (p. ej. "normal", "admin")
 * @returns {{success: boolean, message: string}}
 */
export const registrarUsuario = (
  username,
  email,
  password,
  tipo = "normal"
) => {
  try {
    const dbUsuarios = parseJSON(localStorage.getItem(`Usuarios${tipo}`)) ?? [];

    // Validaciones
    let res = validarUsername(username);
    if (!res.valid) return { success: false, message: res.message };

    res = validarEmail(email);
    if (!res.valid) return { success: false, message: res.message };

    res = validarPassword(password);
    if (!res.valid) return { success: false, message: res.message };

    res = validarUnique(username, email, dbUsuarios);
    if (!res.valid) return { success: false, message: res.message };

    // Crear nuevo usuario
    const nuevoUsuario = {
      id: uuidv4(),
      username,
      email: email || null,
      passwordHash: bcrypt.hashSync(password, 10),
      tipo,
      fechaRegistro: new Date().toISOString(),
    };

    dbUsuarios.push(nuevoUsuario);
    localStorage.setItem(`Usuarios${tipo}`, stringifyJSON(dbUsuarios));

    console.log(`✅ Usuario registrado: ${username}`);
    return { success: true, message: "Usuario registrado correctamente" };
  } catch (error) {
    console.error("❌ Error en registrarUsuario:", error.message);
    return {
      success: false,
      message: "Error interno al registrar usuario",
    };
  }
};

/**
 * Inicia sesión con username o email.
 * @param {string} usernameOrEmail - Username o email
 * @param {string} password - Contraseña en texto plano
 * @param {string} [tipo="normal"] - Tipo de almacenamiento
 * @returns {{success: boolean, message: string, usuario?: Object}}
 */
export const loginUsuario = (usernameOrEmail, password, tipo = "normal") => {
  try {
    const dbUsuarios = parseJSON(localStorage.getItem(`Usuarios${tipo}`)) ?? [];

    const user = dbUsuarios.find(
      (u) => u.username === usernameOrEmail || u.email === usernameOrEmail
    );

    if (!user) return { success: false, message: "⚠️ Usuario no encontrado" };

    const isValid = bcrypt.compareSync(password, user.passwordHash);
    if (!isValid) return { success: false, message: "⚠️ Contraseña incorrecta" };

    console.log(`🔑 Login correcto para usuario: ${user.username}`);
    // Nota: si devuelves el objeto usuario, evita exponer passwordHash en UI pública.
    return { success: true, message: "Login correcto", usuario: user };
  } catch (error) {
    console.error("❌ Error en loginUsuario:", error.message);
    return {
      success: false,
      message: "Error interno al iniciar sesión",
    };
  }
};

/**
 * Cambia la contraseña de un usuario identificado por username o email.
 * @param {string} usernameOrEmail - Username o email del usuario
 * @param {string} passwordActual - Contraseña actual en texto plano
 * @param {string} passwordNueva - Nueva contraseña en texto plano
 * @param {string} [tipo="normal"] - Tipo de almacenamiento
 * @returns {{success: boolean, message: string}}
 */
export const cambiarPassword = (
  usernameOrEmail,
  passwordActual,
  passwordNueva,
  tipo = "normal"
) => {
  try {
    const dbUsuarios = parseJSON(localStorage.getItem(`Usuarios${tipo}`)) ?? [];

    const user = dbUsuarios.find(
      (u) => u.username === usernameOrEmail || u.email === usernameOrEmail
    );

    if (!user) return { success: false, message: "⚠️ Usuario no encontrado" };

    if (!bcrypt.compareSync(passwordActual, user.passwordHash)) {
      return { success: false, message: "⚠️ Contraseña actual incorrecta" };
    }

    const res = validarPassword(passwordNueva);
    if (!res.valid) return { success: false, message: res.message };

    user.passwordHash = bcrypt.hashSync(passwordNueva, 10);

    localStorage.setItem(`Usuarios${tipo}`, stringifyJSON(dbUsuarios));

    console.log(`🔒 Contraseña cambiada para usuario: ${user.username}`);
    return { success: true, message: "Contraseña cambiada correctamente" };
  } catch (error) {
    console.error("❌ Error en cambiarPassword:", error.message);
    return {
      success: false,
      message: "Error interno al cambiar contraseña",
    };
  }
};

/**
 * Devuelve la lista de usuarios guardados.
 * @param {string} [tipo="normal"] - Tipo de almacenamiento
 * @returns {Array<Object>} - Array de usuarios (vacío si no hay)
 */
export const listarUsuarios = (tipo = "normal") => {
  try {
    return parseJSON(localStorage.getItem(`Usuarios${tipo}`)) ?? [];
  } catch (error) {
    console.error("❌ Error en listarUsuarios:", error.message);
    return [];
  }
};

/**
 * Elimina un usuario identificado por username o email si la contraseña coincide.
 * @param {string} usernameOrEmail - Username o email
 * @param {string} password - Contraseña en texto plano
 * @param {string} [tipo="normal"] - Tipo de almacenamiento
 * @returns {{success: boolean, message: string}}
 */
export const eliminarUsuario = (usernameOrEmail, password, tipo = "normal") => {
  try {
    let dbUsuarios = parseJSON(localStorage.getItem(`Usuarios${tipo}`)) ?? [];

    const index = dbUsuarios.findIndex(
      (u) => u.username === usernameOrEmail || u.email === usernameOrEmail
    );

    if (index === -1)
      return { success: false, message: "⚠️ Usuario no encontrado" };

    if (!bcrypt.compareSync(password, dbUsuarios[index].passwordHash)) {
      return { success: false, message: "⚠️ Contraseña incorrecta" };
    }

    console.log(`🗑️ Usuario eliminado: ${dbUsuarios[index].username}`);
    dbUsuarios.splice(index, 1);
    localStorage.setItem(`Usuarios${tipo}`, stringifyJSON(dbUsuarios));

    return { success: true, message: "Usuario eliminado correctamente" };
  } catch (error) {
    console.error("❌ Error en eliminarUsuario:", error.message);
    return {
      success: false,
      message: "Error interno al eliminar usuario",
    };
  }
};
