import Home from './views/Home'
import MisTurnos from './views/MisTurnos'
import NavBar from './components/Navbar'
import Register from './views/Register'
import Login from './views/Login'
import AgendarTurno from './views/AgendarTurnos'
import { Routes, Route, useLocation } from 'react-router-dom'
import { UserContext } from './context/useContext'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

function App() {
    // useLocation:
    const location = useLocation()
    const {user} = useContext(UserContext)

    return(
    <>
        {/* Mostramos el NavBar solo si no estamos en /login ni /register y si hay un userId */}
        {(location.pathname !== "/login" && location.pathname !== "/register" && user) && <NavBar />}
        

    {/* COMPONENTES CON LAS RUTAS (ROUTES Y ROUTE) */}
        <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/home" element={<Home/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/misTurnos" element={<MisTurnos/>} />
            <Route path="/agendarTurnos" element={<AgendarTurno/>} />
        </Routes>
    </>
)};

export default App
