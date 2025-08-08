// Creamos las Funciones de Appointments de Servicio que luego usaran los Controladores en cada caso...
import turnosDto from "../dto/turnosDtos";
import TurnStatus from "../EstatusTurnos/statusTurn";
import { AppDataSource_Turns, AppDataSource_User} from "../config/data-source";
import { Turnos } from "../entities/Turnos";

// 1)_ Obtener el listado de todos los turnos de todos los usuarios.:
export const getAllTurnsServices = async (): Promise<Turnos[]> => {
    const todosLosTurnos = await AppDataSource_Turns.find(
        {
            relations: ["user"],
            order: {
                id: "ASC" // 👈 Ordenamos los usuarios por su ID ascendente
            }
        }
    )
    if(todosLosTurnos.length === 0) throw new Error("");
    return todosLosTurnos
}; 

// 2)_ Obtener el detalle de un turno específico.:
export const getTurnByIdServices = async (id:number): Promise<Turnos> => {
    const turno_by_id = await AppDataSource_Turns.findOne({
        where: { id }, 
        relations: ["user"]  // Aquí agregas la relación con "user"
    })
        if (!turno_by_id) throw new Error("");
        return turno_by_id
};

// 3)_ Agendar un nuevo turno:              
export const createNewTurnServices = async (turnosDatos: turnosDto):Promise<Turnos> =>{
    const user = await AppDataSource_User.findOneBy({id : turnosDatos.userId})
    if (!user) throw new Error("Usuario no encontrado");
    
    const nuevoTurno = {
        date: turnosDatos.date,
        time: turnosDatos.time,
        user: user,
        status: TurnStatus.active
    };
    const creamosUnTurno = await AppDataSource_Turns.create(nuevoTurno)
    const guardamosElTurno = await AppDataSource_Turns.save(creamosUnTurno)
    return guardamosElTurno
};

// 4)_ Cambiar el estatus de un turno a “cancelled”.:
export const cancelledTurnService = async (id:number): Promise<Turnos> => {
    const cancelarTurno: Turnos| null= await AppDataSource_Turns.findOneBy({id})

    if(!cancelarTurno) throw new Error("⛔ No se encontró el turno a cancelar");
    
    cancelarTurno.status = TurnStatus.cancelled
    
    await AppDataSource_Turns.save(cancelarTurno);
    
    return cancelarTurno;
};

const funciones_Turns_Services = {getAllTurnsServices, getTurnByIdServices, createNewTurnServices, cancelledTurnService}

export default funciones_Turns_Services;
