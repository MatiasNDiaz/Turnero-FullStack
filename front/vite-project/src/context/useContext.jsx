import { createContext, useState, useEffect } from "react";
import axios from "axios"

// "Listado de productos en la bodega" o "menu de productos" <-- analogia 
export const UserContext = createContext({
    user: "",
    userAppointments: [],
    funcionRegistro: async ()=>{},
    funcionLogin: async () =>{},
    funcionAgendarTurno: async () =>{},
    obtenerTurnosDeUsuario: async () =>{},
    cerrarSesionUser: ()=>{},
    funcionCancelarTurno:  async () =>{}
});


// Bodega donde se encuentran los productos:
export const UserProvider = ({children}) => {
    

    const [user, setUser] = useState(() => {
        const storedUserId = localStorage.getItem("userId");
        return storedUserId ? parseInt(storedUserId) : null;
    });


    const [userAppointments, setUserAppointments] = useState([]);

    // Cuando el componente se monta, se verifica si hay un usuario en el localStorage
    useEffect(() => {
        if (user) {
            localStorage.setItem('userId', user);  // Guardar el ID del usuario al iniciar sesión
        }
    }, [user]);


    // IMPLEMENTAR LAS SIGUIENTES FUNCIONES:
    // login:
    const funcionLogin = async (userData) => {
        const response = await fetch("http://localhost:3000/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });
        if (response.ok) {
            const data = await response.json(); // Accedemos al cuerpo de la respuesta
            setUser(data.userLogin.id)
            return data.userLogin.id; // Devuelve solo el id del usuario
        } else {
            throw new Error('Error al hacer login');
        }
    }

    // registro:
    const funcionRegistro = async (userData) => {
        const response = await fetch("http://localhost:3000/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });
        return response;
    }

    // crearTurno:
    const funcionAgendarTurno = async (userData) =>{
        const response = await fetch("http://localhost:3000/appointments/schedule", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });
        return response;
    }

    // obtener los turnos del usuario por Id:
    const obtenerTurnosDeUsuario = async (userId) =>{
        const {data} = await axios.get(`http://localhost:3000/users/${userId}`)
        setUserAppointments(data.usuario_solo.turnos || []);
    }

    // CancelarTurno:
    const funcionCancelarTurno = async (appointmentId) =>{
        await axios.put(`http://localhost:3000/appointments/cancel/${appointmentId}`);
        const newAppointment = userAppointments.map((turno) => turno.id === appointmentId ? {...turno, status: "CANCELLED"} : turno)
        setUserAppointments(newAppointment)
    }
    
    // cerrarSesion:
    const cerrarSesionUser = ()=>{
        localStorage.removeItem("userId")
        setUser(false)
        setUserAppointments([])
    }

    const value = {
        user,
        userAppointments,
        funcionRegistro,
        funcionLogin,
        funcionAgendarTurno,
        obtenerTurnosDeUsuario,
        cerrarSesionUser,
        funcionCancelarTurno
    }

    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
)}