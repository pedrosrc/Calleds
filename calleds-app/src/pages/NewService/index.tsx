import { useState } from 'react'
import NavBar from "../../components/Nav/NavBar"
import Title from "../../components/Title/Title"
import '../Home/Layout.css'

const [nameCustumer, setNameCustumer] = useState<string>('')
const [nameService, setNameService] = useState<string>('')


export default function NewService() {
    return (
        <div className="container_layout">
            <NavBar />
            <div >
                <Title title="Novo Serviço" />
                <form className='section_newservice'>
                    <label>Nome do Cliente:</label>
                    <input type="text" />
                    <label> Assunto:</label>
                    <input type="text" />
                    <label> Status:</label>
                    <input type="text" />
                </form>
            </div>

        </div>
    )
}