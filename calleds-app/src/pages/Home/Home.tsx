import { useContext } from "react"
import { AuthContext } from "../../contexts/auth"
import NavBar from "../../components/Nav/NavBar";
import './Layout.css'

export default function Home(){

    const { logout }:any = useContext(AuthContext);

    async function handleLogout() {
        await logout();
    }


    return(
        <div className="container_layout">
            <NavBar/>
            <h1>Chamados</h1>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem explicabo assumenda iusto, quisquam harum quam ut obcaecati totam animi distinctio sequi aperiam facilis mollitia est recusandae quis nisi, officiis perferendis.</p>
        </div>
    )
}