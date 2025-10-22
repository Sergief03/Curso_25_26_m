import  bcrypt  from 'bcryptjs'


export const db = [
  {
    id: 1,
    username: "isaiasfl",
    passwordhash: bcrypt.hashSync("123456789", 10) ,
    rol: "admin",
  },
  {
    id: 2,
    username: "elenita",
    passwordhash: "abcdef",
    rol: "normal",
  },
  {
    id: 3,
    username: "carlos99",
    passwordhash: "qwerty",
    rol: "editor",
  },
  {
    id: 4,
    username: "marcos_dev",
    passwordhash: "pass123",
    rol: "normal",
  },
  {
    id: 5,
    username: "sofia23",
    passwordhash: "mypwd",
    rol: "admin",
  },
  {
    id: 6,
    username: "ana_m",
    passwordhash: "clave1",
    rol: "normal",
  },
  {
    id: 7,
    username: "jorge_t",
    passwordhash: "testpass",
    rol: "editor",
  },
  {
    id: 8,
    username: "luciax",
    passwordhash: "secreto",
    rol: "normal",
  },
  {
    id: 9,
    username: "pedro88",
    passwordhash: "pwd2024",
    rol: "editor",
  },
  {
    id: 10,
    username: "maria_dev",
    passwordhash: "contraseña",
    rol: "admin",
  },
];
