import NavBar from "../../components/Nav/NavBar"
import Title from "../../components/Title/Title"
import './custumers.css'
export default function Cusutumers(){
    return(
        <div className="container_cust">
            <NavBar/>
            <div className="content">
                <Title title="Clientes"/>
            </div>
        </div>
    )
}