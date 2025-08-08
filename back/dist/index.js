"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// importamos el Objeto "app" desde el archivo server.ts y el PORT donde se ejecutara el proyecto, luego Levantamos el Servidor y hacemos que Éste se escuche en el Puerto especificado (en este caso en el 3000)
const envs_1 = require("./config/envs");
const server_1 = __importDefault(require("./server"));
require("reflect-metadata");
const data_source_1 = require("./config/data-source");
data_source_1.AppDataSource.initialize()
    .then(res => {
    console.log("Conexión a la Base de datos éxtosa");
    server_1.default.listen(envs_1.PORT, () => {
        console.log(`El servidor Escuchando en el PORT ${envs_1.PORT}`);
    });
});
