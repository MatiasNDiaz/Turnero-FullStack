import { useState, useContext } from "react";
import { validateRegister } from "../helpers/validacionesRegister";
import styles from "../EstilosModulosCss/Register.module.css"
import PapuchoImg from "../assets/PapuchoImg.png"
import LogoInmo from "../assets/LogoInmo.png"
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { UserContext } from "../context/useContext";

const Register = ()=>{
    const navigate = useNavigate();
    const {funcionRegistro} = useContext(UserContext)

    const [userDataRegister, setUserDataRegister] = useState({
            name: "",
            email:"",
            birthdate: "",
            nDni: "",
            username: "",
            password: ""
    });

    const [errorsRegister,setErrorsRegister] = useState({
        name: "Escribe tu Nombre!",
        email:"Escribe tu Email!",
        birthdate: "Escribe tu fecha de nacimiento!",
        nDni: "Escribe tu numero de DNI!",
        username: "Escribe tu Nombre de Usuario!",
        password: "Escribe tu Contraseña!"
    })

    // // Con esto vamos a manejar los cambios de los Valores de Nuestros inputs en el formulario de Register:
    // const handleInputRegisterChange = (event)=>{
    //     event.preventDefault()
    //     const {name, value} = event.target;
    //     const upDateData = ({...userDataRegister, [name]: value})

    //     setUserDataRegister(upDateData)

    //     const errors = validateRegister(upDateData);
    //     setErrorsRegister(errors)
    // }
    const handleInputRegisterChange = (event) => {
        const { name, value } = event.target; 
    
        // Actualizamos el estado de los datos del formulario
        const updatedData = { ...userDataRegister, [name]: value };
        setUserDataRegister(updatedData);
    
        // Validamos solo el campo que ha cambiado
        const error = validateRegister(updatedData)[name]; // Validamos solo el campo que cambió
        setErrorsRegister(prevErrors => ({
            ...prevErrors,
            [name]: error // Solo actualizamos el error de ese campo
        }));
    };

    const handleSubmitRegister = async (event) => {
        event.preventDefault(); // Evita que se recargue la página al enviar el formulario
    
        const errors = validateRegister(userDataRegister); // Valida todos los campos
        setErrorsRegister(errors); // Actualiza los errores
    1
        if (Object.values(errors).every(error => error === "")) {
            try {
        // ACA REEMPLAZAMOS EL PEDIDO POST DESDE LA FUNCION "funcionRegistro" DEL USERCONTEXT:

                const response = await funcionRegistro({
                    ...userDataRegister,
                    nDni: Number(userDataRegister.nDni)
                });


                if (response.ok) {
                    // Si el registro es exitoso
                    Swal.fire({
                        title: 'Usuario registrado con éxito!',
                        text: 'Te has registrado correctamente, ahora ve a Loguearte.',
                        icon: 'success',  // Puedes usar 'error', 'warning', 'info', 'success'
                        confirmButtonText: 'Aceptar'
                    }).then(() => {
                        setTimeout(() => {
                        navigate('/login');
                        }, 1000)
                    })
                } else {
                    // Si el servidor responde con un error
                    Swal.fire({
                        title: 'Error al Registrarse!',
                        text: 'Hubo un problema al registrarse, intente nuevamente.',
                        icon: 'error',  // Puedes usar , 'warning', 'info', 'success'
                        confirmButtonText: 'Aceptar'
                    })
                }
            } catch (error) {
                console.error(error);
                // Si hay un error de red o de servidor
                alert("Hubo un error al realizar la solicitud.");
            }
        } else {
            alert("Por favor, corrige los errores en el formulario.");
        }
    };

    const handleDisable = () => {
        const hasEmptyFields =
            !userDataRegister.name ||
            !userDataRegister.email ||
            !userDataRegister.birthdate ||
            !userDataRegister.nDni ||
            !userDataRegister.username||
            !userDataRegister.password;
        const hasErrors = Object.values(errorsRegister).some(error => error);
        return hasEmptyFields || hasErrors;
    };

    return(
        <div className={styles.contenedorForm}>
        <form className={styles.contenedorDiv} onSubmit={handleSubmitRegister} >
            <div className={styles.div}>
                <label className={styles.label} htmlFor="name">Nombre:</label>
                <input  className={styles.input}
                        id="name" // atributos del Input:
                        type="text" 
                        name="name" 
                        value={userDataRegister.name} 
                        placeholder=" Jhon Doe" 
                        onChange={handleInputRegisterChange}
                />
                {errorsRegister.name && <p className={styles.p}>{errorsRegister.name}⚠️</p>}
            </div>

            <div className={styles.div}>
                <label className={styles.label} htmlFor="email">Email:</label>
                <input  className={styles.input}
                        id="email" // atributos del Input:
                        type="email" 
                        name="email" 
                        value={userDataRegister.email} 
                        placeholder=" exampleEmail@gmail.com" 
                        onChange={handleInputRegisterChange}
                />
                {errorsRegister.email && <p className={styles.p}>{errorsRegister.email}⚠️</p>}
            </div>

            <div className={styles.div}>
                <label className={styles.label} htmlFor="birthdate">Fecha de Nacimiento:</label>
                <input  className={styles.input}
                        id="birthdate" // atributos del Input:
                        type="date"
                        name="birthdate"
                        value={userDataRegister.birthdate}
                        placeholder=" 12-08-2003"
                        onChange={handleInputRegisterChange}
                />
                {errorsRegister.birthdate && <p className={styles.p}>{errorsRegister.birthdate}⚠️</p>}
            </div>

            <div className={styles.div}>
                <label className={styles.label} htmlFor="numeroDni">Numero de DNI:</label>
                <input  className={styles.input}
                        id="numeroDni" // atributos del Input:
                        type="number"
                        name="nDni"
                        value={userDataRegister.nDni}
                        placeholder=" 44556677"
                        onChange={handleInputRegisterChange}
                />
                {errorsRegister.nDni && <p className={styles.p}>{errorsRegister.nDni}⚠️</p>}
            </div>

            <div className={styles.div}>
                <label className={styles.label} htmlFor="username">Nombre de Usuario:</label>
                <input  className={styles.input}
                        id="username" // atributos del Input:
                        type="text" 
                        name="username" 
                        value={userDataRegister.username} 
                        placeholder=" JHONSUPERDOE" 
                        onChange={handleInputRegisterChange}
                />
                {errorsRegister.username && <p className={styles.p}>{errorsRegister.username}⚠️</p>}
            </div>

            <div className={styles.div}>
                <label className={styles.label} htmlFor="password">Contraseña:</label>
                <input  className={styles.input}
                        id="password" // atributos del Input:
                        type="password" 
                        name="password" 
                        value={userDataRegister.password} 
                        placeholder=" ******" 
                        onChange={handleInputRegisterChange}
                />
                {errorsRegister.password && <p className={styles.p}>{errorsRegister.password}⚠️</p>}
            </div>
            <button className={styles.boton} type="submit" disabled={handleDisable()}>Enviar</button>
            <p className={styles.pEnlaceRegister}><Link to="/login" className={styles.enlaceRegister}>Volver al login</Link></p>
        </form>
        <img className={styles.imagenPa} src={PapuchoImg} alt="Papucho" />
        </div>

)};
export default Register;