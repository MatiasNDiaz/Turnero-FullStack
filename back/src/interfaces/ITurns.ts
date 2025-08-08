import TurnStatus from "../EstatusTurnos/statusTurn"

interface ITurns {
    id: number,
    date: string,
    time: string,
    userId: number, // id del usuario :D
    status: TurnStatus
}

export default ITurns


// Interfaces de Las Consignas: TURNOS
// Appointment:

// id: ID numérico que identifica al turno.

// date: fecha para la cual fue reservado el turno.

// time: hora para la cual fue reservado el turno.

// userId: ID del usuario que agendó el turno, referencia al usuario

// status: status actual del turno, que puede ser “active” o “cancelled”.