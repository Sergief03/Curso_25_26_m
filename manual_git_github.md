# Manual configurar github por ssh
# Conectar GitHub con SSH en Windows

Este manual explica cómo configurar la conexión entre **Git** y **GitHub** utilizando **SSH** en Windows.  

---

## 1. Generar un nuevo par de claves SSH
```bash
ssh-keygen -t ed25519 -C "sergioandrespaco@gmail.com"
```

- `ssh-keygen` -> Genera un nuevo par de claves SSH.  
- `-t ed25519` -> Especifica el algoritmo (más seguro y moderno que `rsa`).  
- `-C "email"` -> Añade un comentario (suele ser el correo de GitHub para identificar la clave).  

 Esto crea dos archivos en `~/.ssh/`:
- **id_ed25519** -> clave privada (NUNCA se comparte).  
- **id_ed25519.pub** -> clave pública (se añade en GitHub).  

---

## 2. Verificar que las claves se han creado
```bash
ls -la ~/.ssh
```

Muestra el contenido de la carpeta `.ssh` donde se guardan las claves.  
Aquí deberías ver `id_ed25519` y `id_ed25519.pub`.  

---

## 3. Mostrar la clave pública
```bash
cat ~/.ssh/id_ed25519.pub
```

 Copia este contenido y añádelo en GitHub:  
**Settings -> SSH and GPG keys -> New SSH key -> pega la clave pública**.
![imagen ssh](/img/imagen_ssh.png)  

---

## 4. Iniciar el agente SSH
```bash
eval "$(ssh-agent -s)"
```

- Inicia el **ssh-agent**, un proceso que guarda tus claves en memoria para no tener que escribir la passphrase cada vez.  

---

## 5. Añadir la clave al agente (Windows PowerShell)
```powershell
Get-Service ssh-agent | Set-Service -StartupType Automatic
Start-Service ssh-agent
ssh-add C:\Users\sergi\.ssh\id_ed25519
```

- `Set-Service -StartupType Automatic` -> Hace que el servicio `ssh-agent` se inicie automáticamente.  
- `Start-Service ssh-agent` -> Arranca el servicio.  
- `ssh-add` -> Añade tu clave privada al agente SSH.  

---

## 6. Probar la conexión con GitHub
```bash
ssh -T git@github.com
```

Si todo va bien, deberías ver algo como:  
```
Hi Sergief03! You've successfully authenticated, but GitHub does not provide shell access.
```

 Esto significa que tu clave SSH está funcionando correctamente.  

---

## 7. Configurar el remoto en Git
```bash
git remote add origin git@github.com:Sergief03/Curso_25_26_m.git
```

- `git remote add origin` -> Añade un repositorio remoto.  
- `git@github.com:usuario/repositorio.git` -> URL en formato SSH.  

---

## 8. Subir cambios al repositorio
```bash
git add manual_git_github.md
git commit -m "Created manual git"
git push -u origin main
```

- `git add` -> Prepara archivos para el commit.  
- `git commit -m` -> Guarda cambios en el historial.  
- `git push -u origin main` -> Sube cambios al remoto (`origin`) en la rama `main`.  


