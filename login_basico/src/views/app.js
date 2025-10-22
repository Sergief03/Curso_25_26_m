import { db } from "../db/db";
import inititaltorage, { setUsuarios } from "../helpers/storage";
import { validarContraseña, validarCredenciales, validarUsuario } from "../services/authServices";
import { renderLoginForm } from "./loginView";

export function initialApp(){
    //Guardamos los usuarios en localStorage
    inititaltorage(db);

    //pintamos/renderizamos mi formulario en 
    const app=document.getElementById("app");
    app.innerHTML=renderLoginForm();
    const form= document.querySelector("#loginForm");
    const message=document.querySelector("#messageLogin");

    //Pongo un escuchador de eventos al formulario
    form.addEventListener("submit",(e)=>{
        e.preventDefault();
        //Comprobar si username y password son correctos
        const formData = new FormData(form);
        const username = formData.get("username")?.trim(); 
        const password = formData.get("password")?.trim();

        console.log(username);

        //crear Funcion que valide que username y password son correctos, usando las siguientes restricciones
        // no puede estar vacias
        // password mayor de ocho caracteres 
        // username y password estan en el localstorage
        const ok=validarCredenciales(username,password);
        message.innerHTML= ok? `<span style="color:green">Bienvenido ${username}</span>`:`<span style="color:red">Credenciales erroneas</span>`;
        form.reset();
    });

    const formRegister= document.querySelector("#registerForm");
    const messageRegister=document.querySelector("#messageRegister");

    //Pongo un escuchador de eventos al formulario
    formRegister.addEventListener("submit",(e)=>{
        e.preventDefault();
        //Comprobar si username y password son correctos
        const formData = new FormData(formRegister);
        const username = formData.get("usernameR")?.trim(); 
        const password = formData.get("passwordR")?.trim();

        //crear Funcion que valide que username y password son correctos, usando las siguientes restricciones
        // no puede estar vacias
        // password mayor de ocho caracteres 
        // username y password estan en el localstorage
        const ok=validarUsuario(username)&&validarContraseña(password);

        if(ok)setUsuarios(username,password);
        messageRegister.innerHTML= ok? `<span style="color:green">Bienvenido ${username}</span>`:`<span style="color:red">Credenciales erroneas</span>`;
        form.reset();
    })
}