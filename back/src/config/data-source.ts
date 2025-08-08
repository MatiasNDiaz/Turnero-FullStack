import { DataSource } from "typeorm"
import { User } from "../entities/User"
import { Turnos } from "../entities/Turnos"
import { Credentials } from "../entities/Credenciales"
import {DB_TYPE, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME, DB_DROPSCHEMA, DB_SYNCHRONIZE, DB_LOGGING, DB_ENTITIES} from "./envs" ;

export const AppDataSource = new DataSource({
    type: DB_TYPE,
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME, 
    password: DB_PASSWORD,
    database: DB_NAME,
    // dropSchema: DB_DROPSCHEMA, 
    synchronize: DB_SYNCHRONIZE,
    logging: DB_LOGGING,
    entities: DB_ENTITIES, 
    
})

export const AppDataSource_User = AppDataSource.getRepository(User)
export const AppDataSource_Credentials = AppDataSource.getRepository(Credentials)
export const AppDataSource_Turns = AppDataSource.getRepository(Turnos)

