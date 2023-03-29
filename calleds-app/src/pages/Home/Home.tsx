import { useContext } from "react"
import { AuthContext } from "../../contexts/auth"
import NavBar from "../../components/Nav/NavBar";

export default function Home(){

    const { logout }:any = useContext(AuthContext);

    async function handleLogout() {
        await logout();
    }


    return(
        <div>
            <NavBar/>
            
            <button onClick={handleLogout}>Sair Teste</button>
        </div>
    )
}