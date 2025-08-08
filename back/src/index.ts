// importamos el Objeto "app" desde el archivo server.ts y el PORT donde se ejecutara el proyecto, luego Levantamos el Servidor y hacemos que Éste se escuche en el Puerto especificado (en este caso en el 3000)
import { PORT } from "./config/envs";
import app from "./server";
import "reflect-metadata" 
import { AppDataSource } from "./config/data-source";

AppDataSource.initialize()
    .then(res => {
    console.log("Conexión a la Base de datos éxtosa");
    app.listen(PORT, ()=>{
        console.log(`El servidor Escuchando en el PORT ${PORT}`);
    })
})

