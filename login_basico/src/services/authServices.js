import { ENV } from "../config/env";
import { getUsuarios } from "../helpers/storage";
import  bcrypt  from 'bcryptjs'

export const validarUsuario=(username)=>{
  const regexUser = /^[a-zA-Z0-9_]{3,}$/;
  if (!username || !regexUser.test(username)) {
    return false;
  }
  return true;
}

export const validarContraseña=(password)=>{
  if (!password || password.length < 8) {
    return false;
  }
  return true;
}

export const validarCredenciales = (user, pass) => {
  const regexUser = /^[a-zA-Z0-9_]{3,}$/;
  const username=user;
  const password=pass;

  // ✅ Validación del username
  if (!username || !regexUser.test(username)) {
    return false;
  }

  // ✅ Validación de la contraseña
  if (!password || password.length < 8) {
    return false;
  }

  // ✅ Recuperar usuarios del storage
  const usuarios = getUsuarios();

  // ✅ Buscar coincidencia
  const encontrado = usuarios.find(
    (object) =>
      object.username === username
  );

  if(!encontrado){
    return false;
  }

  if (!bcrypt.compareSync(password, encontrado.passwordhash)) {
        return false;
    }

  return  true// Devuelve true si existe, false si no
};
