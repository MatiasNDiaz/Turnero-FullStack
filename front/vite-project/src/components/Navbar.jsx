import logo from '../assets/SuperLogoChatGPT.png';
import logo2 from '../assets/iconoLogin.png';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/useContext';

import styles from "../EstilosModulosCss/NavBar.module.css"

function NavBar() {
    const navigate = useNavigate()
    const {cerrarSesionUser,user} = useContext(UserContext)

    const handleCloseSesionUser = async () => {
        cerrarSesionUser()
        Swal.fire({
            icon: "success",
            title: "tu sesion fue cerrada correctamente"
        })
        navigate("/login")
    }
    
    return( 
    <>
    <div>
        <div className={styles.div}>
        <img src={logo} alt="Logo CercaTrova" className={styles.imagenLogo} />
        <ul className={styles.ul}>
            <li className={styles.li}> <Link to="/home" className={styles.a} >Inicio</Link></li>
            <li className={styles.li}> <Link to="/misTurnos"  className={styles.a} >Mis Citas</Link> </li>
            <li className={styles.li}> <Link to="/agendarTurnos"  className={styles.a} >Agendar Cita</Link></li>
            {/* Si no hay userId en el UserContext, mostramos los links de Login y Register */}
            {!user && (
                        <>
                            <li className={styles.li}><Link to="/register" className={styles.a}>Registrarse</Link></li>
                            <li className={styles.li}><Link to="/login" className={styles.a}>Login</Link></li>
                        </>
                    )}

                    {/* Si hay un userId, mostramos el botón de Cerrar Sesión */}
                    {user && (
                        <li className={styles.li}>
                            <button onClick={handleCloseSesionUser} className={styles.a}>Cerrar Sesión</button>
                        </li>
                    )}
        </ul>
              {/* Este enlace de Login se debe ocultar si hay un userId */}
                {!user && (
                    <Link to="/login" href="" className={styles.aDelLogin}>
                        <img src={logo2} alt="" className={styles.loginImagen} />Login
                    </Link>
                )}
        </div>
    </div>
    </>
)};

export default NavBar; 