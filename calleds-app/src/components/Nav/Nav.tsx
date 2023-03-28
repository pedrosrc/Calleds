import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "../../pages/Login/Login"
import Register from "../../pages/Register/Register"
import Home from "../../pages/Home/Home"
import Privade from "../Privade/Privade"

export default function Nav() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/home" element={ <Privade> <Home/> </Privade> }/>
                </Routes>
            </BrowserRouter>

        </div>
    )
}