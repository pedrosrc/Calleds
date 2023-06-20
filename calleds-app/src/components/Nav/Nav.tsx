import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "../../pages/Login/Login"
import Register from "../../pages/Register/Register"
import Home from "../../pages/Home/Home"
import Privade from "../Privade/Privade"
import Profile from "../../pages/Profile/Profile"
import Cusutumers from "../../pages/Custumers/Custumers"
import NewService from "../../pages/NewService"
import NotFound from "../../pages/NotFound"

export default function Nav() {
    return (
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/home" element={ <Privade> <Home/> </Privade> }/>
            <Route path="/clientes" element={  <Privade> <Cusutumers/>  </Privade> }/>
            <Route path="/perfil" element={ <Privade> <Profile/> </Privade> } />
            <Route path="/novo-serviço" element={ <Privade> <NewService/> </Privade> }/>
            
            <Route path="*" element={<NotFound/>} />
        </Routes>               
   
    )
}