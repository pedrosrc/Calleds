import { useState, useContext, useEffect } from "react"
import { AuthContext } from "../../contexts/auth"
import {RiFileList3Fill} from 'react-icons/ri'
import NavBar from "../../components/Nav/NavBar"
import Title from "../../components/Title/Title"
import '../Profile/profile.css'

export default function NewService() {

    const { addService, user }: any = useContext(AuthContext)

    const [nomeCliente, setNomeCliente] = useState<string>('')
    const [typeService, setTypeService] = useState<string>('')
    const [stateService, setStateService] = useState<string>('')

    async function handleAdd(e: any) {
        e.preventDefault();
        if (nomeCliente === '' || typeService === '' || stateService === '') {
            alert('Preencha os dados corretamente!')
        } else {
            addService(nomeCliente, typeService, stateService)
            setNomeCliente('')
            setTypeService('')
            setStateService('')
        }
    }

    function nameChange(e:any){
        setNomeCliente(e.target.value)
    }
    function typeChange(e:any){
        setTypeService(e.target.value)
    }
    function stateChange(e:any){
        setStateService(e.target.value)
    }


    return (
        <div className="container_profile">
            <NavBar />
            <div className="content">
                <Title title="Novo Serviço" />
                <div className="container_service">
                    <form className='form_profile' onSubmit={handleAdd}>
                        <div className="info_user">
                            <h1>Adicione um novo serviço</h1>
                            <label>Nome do Cliente:</label>
                            <input type="text" value={nomeCliente} onChange={nameChange}/>
                            <label> Assunto:</label>
                            <input type="text" value={typeService} onChange={typeChange}/>
                            <label> Status:</label>
                            <input type="text" value={stateService} onChange={stateChange}/>
                            <button type="submit">Adicionar</button>
                        </div>
                    </form>
                </div>

            </div>

        </div>
    )
}