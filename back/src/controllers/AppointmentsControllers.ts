import funciones_Turns_Services from "../services/appointmentsServices";
import { Request, Response } from "express";
import { Turnos } from "../entities/Turnos";

// Creamos las Funciones CallBack que estarán como Segundo parametro en las Rutas de Appointements...

// 1)_ Obtener el listado de todos los turnos de todos los usuarios.:
export const getAllTurns = async (req: Request, res: Response)=>{
    try {
        const Turnos:Turnos[] = await funciones_Turns_Services.getAllTurnsServices()
        res.status(200).json({message:"✅Turnos Obetenidos Con Exíto🥳!",Turnos})

    } catch (error: any) {
        res.status(404).json({
            message: "❌No Hay Turnos Disponibles😔.", 
        });
    }
}; 

// 2)_ Obtener el detalle de un turno específico.:
export const getTurnById = async (req: Request, res: Response)=>{
    try {
        const id = Number(req.params.id)
        const Turno_usuario = await funciones_Turns_Services.getTurnByIdServices(id)
        res.status(200).json({message:"✅Turno Del Usuario Obetenido Con Exíto😎!", Turno_usuario})
    } catch (error:any) {
        res.status(404).json({
            message: "❌El Usuario No tiene Turno/s Agendados🤨🤔.",
        });
    }
};
    
// 3)_ Agendar un nuevo turno:
export const createNewTurn = async (req: Request, res: Response): Promise<any>=>{
const { date, time, userId } = req.body;
     // Validaciones para Validar los Turnos del Usuario: 
    if (date === undefined ||time === undefined || userId === undefined) {
        return res.status(400).json({ message:"⚠️Faltan datos para Agendar un Turno ⛔️" });
    };

    if ( typeof date !== 'string' || typeof time !== 'string' || typeof userId !== 'number') {
        return res.status(400).json({ message:"⚠️Datos inválidos para Agendar un Turno⛔️" });
    };
    // Fin de las Validaciones....(por ahora jeje)

    try {
        const newTurnUser:Turnos = await funciones_Turns_Services.createNewTurnServices({ date, time, userId })
        res.status(201).json({message:"✅Turno del Usuario Agendado Con Exíto!" ,newTurnUser})
    } catch (error) {
        res.status(400).json({
            message: "❌Error al Agendar el Turno🤨🤔.",
        });
    }
};

// 4)_ Cambiar el estatus de un turno a “cancelled”.:
export const cancelledTurn = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    try {
        const CancelarTurno = await funciones_Turns_Services.cancelledTurnService((id))
        res.status(200).json({message:"✅Turno del Usuario Cancelado Con Exíto!" , CancelarTurno})

    } catch (error) {
        res.status(404).json({
            message: "❌Error al Cancelar el Turno🤨🤔.",
        });
    }
};

const funciones_Turns_Controllers = {getAllTurns, getTurnById, createNewTurn, cancelledTurn};

export default funciones_Turns_Controllers;
