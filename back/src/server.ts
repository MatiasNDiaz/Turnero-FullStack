import express from "express";
import router from "./routes/indexRouter";
import morgan from "morgan";
import cors from "cors"

// ✅ Inicializamos la app de Express, que se encargará de recibir y manejar las requests
const app = express();

// ✅ Este middleware transforma automáticamente cualquier JSON que venga en el body del request en un objeto JavaScript accesible desde req.body
app.use(express.json()); 
app.use(morgan("dev"));
app.use(cors());

// ✅ Cada request que entre a la app va a ser chequeada por este router, y según el path de la URL (/users, /appointments), va a ser redirigida automáticamente al sub-router que le corresponda (userRouter o appointmentRouter). Luego, ese sub-router se encarga de ejecutar el controlador (controller) que maneja la lógica de esa ruta específica.
app.use(router);

// ✅ Exportamos la app para que pueda ser usada en index.ts, que es quien realmente levanta el servidor
export default app;