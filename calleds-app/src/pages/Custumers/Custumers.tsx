import { useState, useContext, useEffect } from "react"
import { AuthContext } from "../../contexts/auth"
import { db } from "../../services/firebaseConnection"
import NavBar from "../../components/Nav/NavBar"
import Title from "../../components/Title/Title"

import {BiUser} from 'react-icons/bi'
import '../Profile/profile.css'

import { collection, query, getDocs } from "firebase/firestore"
export default function Cusutumers() {

    const [nomeCliente, setNomeCliente] = useState<string>('')
    const [numberCliente, setNumberCliente] = useState<number[]>([])
    const [emailCliente, setEmailCliente] = useState<string>('')
    const [clientes, setClientes] = useState<any[]>([])

    const { addCliente, user }: any = useContext(AuthContext)

    async function handleAdd(e: any) {
        e.preventDefault();
        if (nomeCliente === '' || numberCliente.length < 10 || emailCliente === '') {
            alert('Preencha os dados corretamente!')
        } else {
            addCliente(nomeCliente, numberCliente, emailCliente)
        }
    }

    useEffect(() => {
        async function loadClientes() {
            const clientesRef = collection(db, 'users', user.uid, 'clientes')

            const q = query(clientesRef);

            const querySnapshot = await getDocs(q);

            let lists:any = []

            querySnapshot.forEach((doc:any) => {
                lists.push({
                    id: doc.id,
                    nomeCliente: doc.data().NomeCliente,
                    emailCliente: doc.data().EmailCliente

                })
            });
            setClientes(lists);
        }
        loadClientes();
    }, [])


    return (
        <div className="container_profile">
            <NavBar />
            <div className="content">
                <Title title="Clientes" />
                <div className="container_user">
                    <form className="form_profile" onSubmit={handleAdd}>
                        <h1>Novo Cliente:</h1>
                        <div className="info_user">
                            <label>Nome:</label>
                            <input type="text" placeholder="Digite o nome" onChange={(e) => setNomeCliente(e.target.value)} />
                            <label>Telefone:</label>
                            <input type="number" placeholder="(xx) xxxxx-xxxx" onChange={(e: any) => setNumberCliente(e.target.value)} />
                            <label> Email:</label>
                            <input type="email" placeholder="Digite o email" onChange={(e) => setEmailCliente(e.target.value)} />
                            <button type="submit">Cadastrar</button>
                        </div>
                    </form>

                </div>
            </div>
            {clientes.map((item:any) => {
                return(
                    <article className="article_clients" key={item.id}>
                        <span><BiUser size={75}/></span>
                        <h1>Nome: {item.nomeCliente}</h1>
                        <p>Email: {item.emailCliente}</p>
                    </article>
                )
            })}
        </div>
    )
}