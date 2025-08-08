import { useState, useContext } from "react";
import { validateLogin } from "../helpers/validacionesLogin";
import styles from "../EstilosModulosCss/Login.module.css"
import LoginPapucho from "../assets/LoginPapucho.png"
import { Link, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { UserContext } from "../context/useContext";

const Login = ()=>{

    const {funcionLogin} = useContext(UserContext)

    // useNavigate:
    const navigate = useNavigate();
    const [userDataLogin, setUserDataLogin] = useState({
            username: "",
            password: ""
    });
    const [errorsLogin,setErrorsLogin] = useState({
            username: "Escribe tu Nombre de Usuario!",
            password: "Escribe tu Contraseña!"
        
    });
    // Con esto vamos a manejar los cambios de los Valores de Nuestros inputs en el formulario de Login:
    const handleInputLoginChange = (event) =>{
        const {name, value} = event.target;
        const updatedData= {...userDataLogin, [name] : value}
        setUserDataLogin(updatedData);
        const errors = validateLogin(updatedData)[name];
        setErrorsLogin(PrevErrors => ({
            ...PrevErrors,
            [name] : errors 
        }))
    };
    const handleSubmitLogin = async (event) => {
        event.preventDefault();
    
        // Validar de nuevo antes de enviar (por si alguien tocó el DOM jeje)
        const validationErrors = validateLogin(userDataLogin);
        if (Object.keys(validationErrors).length > 0) {
            setErrorsLogin(validationErrors);
            return;
        }
    
        // ACA REEMPLAZAMOS EL PEDIDO POST DESDE LA FUNCION "funcionLogin" DEL USERCONTEXT:
        try {
            const userId = await funcionLogin(userDataLogin)
    
            if (!userId) {
                // Si hay error del back
                Swal.fire({
                    title: 'error al iniciar sesión.',
                    text: 'Hubo un problema al iniciar sesión, intente nuevamente.',
                    icon: 'error',  // Puedes usar 'error', 'warning', 'info', 'success'
                    confirmButtonText: 'Aceptar'
                })
            } else {
                // Login exitoso
                Swal.fire({
                    title: 'Usuario logueado éxitosamente!',
                    text: 'Tu inicion de sesión fue éxitoso.',
                    icon: 'success',  // Puedes usar 'error', 'warning', 'info', 'success'
                    backdrop: false,
                    position: 'center',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    navigate('/home')}); 
                // Acá podrías guardar un token o redirigir
                // navigate("/home");
            }
    
        } catch (error) {
            console.error("Error en login:", error);
            Swal.fire({
                title: 'error al iniciar sesión.',
                text: 'sus datos deben ser incorrectos, intente nuevamente.',
                icon: 'error',  // Puedes usar 'error', 'warning', 'info', 'success'
                confirmButtonText: 'Aceptar'
            })
        }
    }; 
    
    const handleDisable = () => {
        const hasEmptyFields =
            !userDataLogin.username||
            !userDataLogin.password;
        const hasErrors = Object.values(errorsLogin).some(error => error);
        return hasEmptyFields || hasErrors;
    };
    return(
        <form className={styles.contenedorDiv} onSubmit={handleSubmitLogin}>
            <img src={LoginPapucho}  className={styles.imagenPa} alt="" />
        <div className={styles.div}>
            <label className={styles.label} htmlFor="usernameLogin">Nombre de Usuario:</label>
            <input className={styles.input} id="usernameLogin" // atributos del Input:
                    type="text" 
                    name="username" 
                    value={userDataLogin.username} 
                    placeholder="NombreUsuarioEjemplo"
                    onChange={handleInputLoginChange}
            />
            {errorsLogin.username && <p className={styles.p}>{errorsLogin.username}⚠️</p>}
        </div>
        <div className={styles.div}>
            <label className={styles.label} htmlFor="passwordLogin">Contraseña:</label>
            <input className={styles.input} id="passwordLogin" // atributos del Input: 
                    type="password" 
                    name="password" 
                    value={userDataLogin.password} 
                    placeholder="******"
                    onChange={handleInputLoginChange}
            />
            {errorsLogin.password && <p className={styles.p}>{errorsLogin.password}⚠️</p>}
        </div>
        <button className={styles.boton} type="submit" disabled={handleDisable()}>Enviar</button>
        <p className={styles.pEnlaceRegister}>¿Aún no te registraste?... <Link to="/register" className={styles.enlaceRegister}>registrarse</Link></p>
    </form>
)};
export default Login