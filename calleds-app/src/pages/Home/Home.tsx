import NavBar from "../../components/Nav/NavBar";
import Title from "../../components/Title/Title";
import { Link } from "react-router-dom";
import './Layout.css'

export default function Home(){

    return(
        <div className="container_layout">
            <NavBar/>
            <div className="content_layout">
                <Title title="chamados"/>
                <button><Link to={'/novo-serviço'}>Novo Chamado +</Link></button>
            </div>
        </div>
    )
}