import styles from "../EstilosModulosCss/TurnosUsuarios.module.css"
import Swal from "sweetalert2";
import { useContext } from "react";
import { UserContext } from "../context/useContext";

function TurnosUser({Turnitos: {id, date, time, status}, indiceTurno ,userId}) {
    const {funcionCancelarTurno} = useContext(UserContext)

    const handleCancelarTurno = async () => {
        // Mostramos el SweetAlert con dos opciones
        Swal.fire({ 
            title: '¿Estás seguro de que deseas cancelar este turno?',
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,  // Muestra el botón de "Cancelar"
            confirmButtonText: 'Sí, cancelar',
            cancelButtonText: 'No, mantener',
            reverseButtons: true,  // Cambia el orden de los botones
        }).then(async (result) => {
            // Si el usuario confirma (elige "Sí, cancelar")
            if (result.isConfirmed) {
                try {
                    // Realizamos la solicitud PUT para cancelar el turno
                    funcionCancelarTurno(id)
                    
                    Swal.fire({
                        title: 'Turno cancelado con éxito!',
                        text: 'El turno se ha cancelado, puedes sacar otro.',
                        icon: 'success',
                        confirmButtonText: 'Aceptar',
                    });
                    // Acá podrías agregar lógica para actualizar la lista de turnos, si lo necesitas
                } catch (error) {
                    console.error("Error al cancelar el turno:", error);
                    Swal.fire({
                        title: 'Error al cancelar el turno.',
                        text: 'Hubo un problema al intentar cancelar el turno, por favor intenta nuevamente.',
                        icon: 'error',
                        confirmButtonText: 'Aceptar',
                    });
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // Si el usuario cancela (elige "No, mantener")
                Swal.fire({
                    title: 'Operación cancelada',
                    text: 'El turno no ha sido cancelado.',
                    icon: 'info',
                    confirmButtonText: 'Aceptar',
                });
            }
        });
    };

    // cambiar de color al Status:
    const statusStyle = status === "CANCELLED"
    ? { color: "red" }
    : { color: "green" };
    
    return (
        <>
        <div className={styles.contenedorTurnos}>
            <div className={styles.turnoUsuario}>
                <p className={styles.infoTurno}><span className={styles.spanIDTurno}>Turno N°:</span>  {indiceTurno}</p>
                <p className={styles.infoTurno}><span className={styles.spanDate}>Fecha:</span>  {date}</p>
                <p className={styles.infoTurno}><span className={styles.spanTime}>Hora:</span>  {time}</p>
                <p className={styles.infoTurnoStatus} style={statusStyle}><span className={styles.spanStatus}>Estado:</span>  {status}</p>
                <p className={styles.infoTurno}><span className={styles.spanID}>Usuario N°:</span>  {userId}</p>
                <button disabled={status === "CANCELLED"} onClick={handleCancelarTurno} className={styles.bottonCancelar}>Cancelar</button>
            </div>
        </div>
        </>
)}; 

export default TurnosUser    