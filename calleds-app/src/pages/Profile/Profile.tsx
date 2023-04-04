import NavBar from "../../components/Nav/NavBar"
import Title from "../../components/Title/Title"
import './profile.css'
export default function Profile(){
    return(
        <div className="container_profile">
            <NavBar/>

            <div className="content">
                <Title title="Configurações"/>
            </div>
        </div>
    )
}