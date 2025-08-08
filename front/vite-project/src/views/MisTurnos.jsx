import { useContext, useEffect } from "react";
import TurnosUser from "../components/TurnoUser";
import styles from "../EstilosModulosCss/Turnoss.module.css"
import { UserContext } from "../context/useContext";
// import { useContext } from "react";
// import { UserContext } from "../context/useContext";

function MisTurnos() {

    const {userAppointments, obtenerTurnosDeUsuario, user} = useContext(UserContext)
    
     // ACTIVIDAD 9 RESUELTA: REPASAR DE AQUI:
    useEffect(() => {
        if (user && user !== "0") {
            // ACA NO HACEMOS EL PEDIDO
            obtenerTurnosDeUsuario(user);
        }
    }, [user]);
    // HASTA ACÁ.

    const getTurnos = ()=>{
        return userAppointments 
    }

    return (
        <>
        <h2 className={styles.h2}>Citas Programadas:</h2>
        <div className={styles.divContenedorTurnos}>{
            userAppointments.map((turno, indice)=> 
            <TurnosUser key={turno.id} userId={user} indiceTurno={indice + 1} Turnitos={turno} actualizarTurnos={getTurnos}/>
        )
        }</div>
        </> 
)}

export default MisTurnos