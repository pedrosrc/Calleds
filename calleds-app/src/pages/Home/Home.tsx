import NavBar from "../../components/Nav/NavBar";
import Title from "../../components/Title/Title";
import './Layout.css'

export default function Home(){

    return(
        <div className="container_layout">
            <NavBar/>
            <div className="content">
                <Title title="chamados"/>
            </div>
        </div>
    )
}