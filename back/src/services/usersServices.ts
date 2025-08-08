import IUserDto from "../dto/userDto";
import funciones_Credenciales_Service, { buscarCredencialDelUser } from "./credentialsService";
import { User } from "../entities/User";
import { AppDataSource, AppDataSource_User} from "../config/data-source";
import credentialDto from "../dto/credentialsDto";
import { Credentials } from "../entities/Credenciales";

// 1)_ Obtener el listado de todos los usuarios:
export const getUsersService = async ():Promise<User[]> => {
    const usuarios = await AppDataSource_User.find(
        {
            relations: ["turnos"],
            order: {
                id: "ASC" // 👈 Ordenamos los usuarios por su ID ascendente
            } // Esto carga los turnos relacionados con el usuario
        }
    )
    if(usuarios.length === 0) throw new Error("");
    return usuarios
}; 

// 2)_ Obtener el detalle de un usuario específico por su id:
export const getUserByIdService = async (id:number): Promise<User | null> => {
        const usuario_by_id = await AppDataSource_User.findOne({
            where: { id },   // Buscar al usuario por su id
            relations: ["turnos"],  // Cargar los turnos asociados al usuario
        })
        if (!usuario_by_id) throw new Error("");
        return usuario_by_id
};

// 3)_ Registro de un nuevo usuario en SERVICE (crear Usuario):
export const registerUserService = async (userData: IUserDto): Promise<User>=>{
    const resultado_Transaccion = await AppDataSource.transaction( async (entityManager)=> {
    const credencialUser:Credentials = await funciones_Credenciales_Service.createCredentials(entityManager, userData.username, userData.password)
    const newUser: User = entityManager.create(User,{
        name: userData.name,
        email: userData.email, 
        birthdate: userData.birthdate,
        nDni: userData.nDni,
        credentialsId: credencialUser
    })    
    const result = await entityManager.save(newUser)
    return result
    })
    return resultado_Transaccion
};

// 4)_ Login del usuario a la aplicación: (ya se que ahora mismo esta es una funcion para borrar, pero despues se cambia x una de login)
export const loginUserService = async (Credenciales : credentialDto): Promise<User|null>=>{
    const buscarCredenciales = await buscarCredencialDelUser( Credenciales.username, Credenciales.password )
    const credencialUsuario = await AppDataSource_User.findOneBy({ id: buscarCredenciales })
    return credencialUsuario
};

const funciones_Users_Services = {getUsersService, getUserByIdService, registerUserService, loginUserService};

export default funciones_Users_Services;
