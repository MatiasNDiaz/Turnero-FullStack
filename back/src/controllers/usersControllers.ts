import funciones_Users_Services from "../services/usersServices";
import { Request, Response } from "express";
import { User } from "../entities/User";
// Creamos las Funciones CallBack que estarán como Segundo parametro en las Rutas de Usuarios...

// 1)_ Obtener el listado de todos los usuarios:
export const getUsers = async (req: Request, res: Response)=>{
    try {
        const usuarios:User[] = await funciones_Users_Services.getUsersService()
        res.status(200).json({message:"✅Usuarios Obetenidos Con Exíto🥳!",usuarios})

    } catch (error: any) {
        res.status(404).json({
            message: "❌Error al Obtener Todos los Usuarios😔.", 
        });
    } 
};

// 2)_ Obtener el detalle de un usuario específico por su id:
export const getUserById = async (req: Request, res: Response)=>{
    try {
        const id = Number(req.params.id)
        const usuario_solo: User | null = await funciones_Users_Services.getUserByIdService(id)
        res.status(200).json({message:"✅Usuario Obetenido Con Exíto😎!", usuario_solo})
    } catch (error:any) {
        res.status(404).json({
            message: "❌Error al Obtener El Usuario😔.",
        });
    }
};

// 3)_ Registro de un nuevo usuario (crear Usuario)
export const registerUser = async (req: Request, res: Response): Promise<any>=>{
    const { name, email, birthdate, nDni, username, password } = req.body;
    
    // Validaciones para los Datos del Usuario: 
    if (name === undefined ||email === undefined || birthdate === undefined || nDni === undefined || username === undefined || password === undefined) {
        return res.status(400).json({ message:"⚠️Faltan datos obligatorios en el Registro⛔️" });
    };

    if ( typeof name !== 'string' || typeof email !== 'string' || typeof birthdate !== 'string' || typeof nDni !== 'number' || typeof username !== 'string' || typeof password !== "string") {
        return res.status(400).json({ message:"⚠️Datos inválidos en el Registro⛔️" });
    };

    if (typeof nDni !== 'number' || nDni.toString().length != 8 || isNaN(nDni)) {
        return res.status(400).json({ message: "⚠️El DNI debe ser un número válido de 8 dígitos⛔️" });
    }
    // Fin de las Validaciones....(por ahora jeje)

    try {
        const newUser:User = await funciones_Users_Services.registerUserService({ name, email, birthdate, nDni, username, password })
        res.status(201).json({message: "✅Usuario Registrado Con Exíto😁!", newUser})

    } catch (error) {
        console.error("Error al registrar usuario:", error);
        return res.status(500).json({ message: "❌Error al registrar el usuario. Intenta nuevamente." });
    }
};

// 4)_ Login del usuario a la aplicación: (ya se que ahora mismo esta es una funcion para borrar, pero despues se cambia x una de login)
export const loginUser = async (req: Request, res: Response): Promise<any>=>{
    const { username, password } = req.body
 // Validaciones para los Datos del Usuario: 
    if (username === undefined || password === undefined) {
        return res.status(400).json({ message:"⚠️Faltan datos obligatorios en el Login⛔️" });
    };

    if (typeof username !== 'string' || typeof password !== "string") {
        return res.status(400).json({ message:"⚠️Tipos de datos inválidos en el Login⛔️" });
    };
    try {
        const userLogin = await funciones_Users_Services.loginUserService({ username, password }) 
        res.status(200).json({message: "✅Usuario Logueado con Exíto😁", userLogin})  
    
    } catch (error) {
        return res.status(500).json({ message: "❌Usuario No Encontrado!." });
    }
};

const funciones_Users_Controllers = {getUsers, getUserById, registerUser, loginUser}
export default funciones_Users_Controllers  