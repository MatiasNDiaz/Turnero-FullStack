import { useState, useContext } from "react";
import styles from "../EstilosModulosCss/Agendar.module.css"
import { Link } from 'react-router-dom';
import validarAgendarTurnos from "../helpers/AgendarAppointments";
import { UserContext } from "../context/useContext";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

const AgendarTurno = () =>{
    const navigate = useNavigate();
    // importamos el useContext:
    const {funcionAgendarTurno, user} = useContext(UserContext)

    // estado inicial de mi componente agendar Turno:
    const [turnoAgendar, setTurnoAgendar ] = useState({
        date: "",
        time: ""
    });
    

    // estado inicial de mis validaciones de Errores de mi componente agendar Turno:
    const [AgendarErrors, setAgendarErrors ] = useState({
        date: "Ingresa una Fecha!",
        time: "Ingresa una Hora"
    });


    // Funcion manejadora de los cambios en mis Inputs (cambia cuando le agregamos Datos):
    const handleInputsChangeSchedule = (event) => {
        const {name, value} = event.target;
        const updatedData = {...turnoAgendar, [name] : value}
        setTurnoAgendar(updatedData);

        // validamos los Posibles Errores al Agendar el turno:
        const errors = validarAgendarTurnos(updatedData)[name]; 
        setAgendarErrors(PrevErrors => ({
            ...PrevErrors,
            [name] : errors 
        }))
    };

    // Funcion manejadora de Enviar el Formulario
    const handleSubmitFormSchedule = async (event) => {
        event.preventDefault();
        try {
                const agendarTurnoUser = await funcionAgendarTurno({
                    ...turnoAgendar, userId:user
                })
                
                if (!agendarTurnoUser) {
                    // Si hay error del back
                    Swal.fire({
                            title: 'error al Agendar un Turno.',
                            text: 'Hubo un problema al agendar su turno, intente nuevamente.',
                            icon: 'error',  // Puedes usar 'error', 'warning', 'info', 'success'
                            confirmButtonText: 'Aceptar'
                    })
                } else {
                        // Login exitoso
                    Swal.fire({
                            title: 'Turno agendado éxitosamente!',
                            text: 'el turno se agendo correctamente.',
                            icon: 'success',  // Puedes usar 'error', 'warning', 'info', 'success'
                            backdrop: false,
                            position: 'center',
                            confirmButtonText: 'Aceptar'
                    }).then(() => {
                        navigate('/misTurnos')}); 
                        // Acá podrías guardar un token o redirigir
                        // navigate("/home");
                    }
                
                } catch (error) {
                    console.error("Error en login:", error);
                    alert("💥 Error en el servidor. Intenta más tarde.");
                    }
            }; 

    // Funcion manejadora para desactivar el Boton de enviar el formulario antes de rellenar los turnos
    const handleDisableSchedule = () => {
        const hasEmptyFields =
            !turnoAgendar.date||
            !turnoAgendar.time;
        const hasErrors = Object.values(AgendarErrors).some(error => error);
        return hasEmptyFields || hasErrors;
    };


    return(
        <form className={styles.contenedorDiv} onSubmit={handleSubmitFormSchedule}>
            {/* <img src={LoginPapucho}  className={styles.imagenPa} alt="" /> */}
        <div className={styles.div}>
            <label className={styles.label} htmlFor="date">Fecha:</label>
            <input className={styles.input} 
                    id="date" // atributos del Input:
                    name="date" 
                    type="date"
                    min={ new Date().toISOString().split("T")[0]} 
                    placeholder="12/08/2025"
                    value={turnoAgendar.date} 
                    onChange={handleInputsChangeSchedule}
            />
            {AgendarErrors.date && <p className={styles.p}>{AgendarErrors.date}⚠️</p>}
        </div>

        <div className={styles.div}>
            <label className={styles.label} htmlFor="passwordLogin">Hora:</label>
            <input className={styles.input} 
                    id="time" // atributos del Input:  
                    type="time" 
                    name="time" 
                    value={turnoAgendar.time} 
                    placeholder= "10:30"
                    onChange={handleInputsChangeSchedule}
            />
            {AgendarErrors.time && <p className={styles.p}>{AgendarErrors.time}⚠️</p>}
        </div>
        <button className={styles.boton} type="submit" disabled={handleDisableSchedule()}>Enviar</button>
    </form>
)
}


export default AgendarTurno;