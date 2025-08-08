// import ICredential from "../interfaces/ICredentials";
import { EntityManager } from "typeorm";
import { AppDataSource_Credentials } from "../config/data-source";
import { Credentials } from "../entities/Credenciales";

// 1)_ Funcion 1: Implementar una función que reciba username y password y cree un nuevo par de credenciales con estos datos. Debe retornar el ID del par de credenciales creado.
export const createCredentials = async (entityManager: EntityManager, username: string, password: string): Promise<Credentials>=>{
    const Crear_Credencial: Credentials = entityManager.create(Credentials,{
        username: username,
        password: password
    })
    const nueva_Credencial = await entityManager.save(Crear_Credencial)
    return nueva_Credencial
};

// 2)_ Funcion 2: Implementar una función que recibirá username y password, y deberá chequear si el nombre de usuario existe entre los datos disponibles y, si es así, si el password es correcto. En caso de que la validación sea exitosa, deberá retornar el ID de las credenciales. 
export const buscarCredencialDelUser = async ( username: string, password: string): Promise<any>=>{
    const buscarCredencial = await AppDataSource_Credentials.findOne({
        where: {
            username: username,
            password: password
        }
    });
    if (!buscarCredencial) throw new Error("Usuario o Contraseña No encontrados");
    return buscarCredencial.id;
};

const funciones_Credenciales_Service = {createCredentials, buscarCredencialDelUser};

export default funciones_Credenciales_Service;