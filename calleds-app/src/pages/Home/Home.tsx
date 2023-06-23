import { useState, useContext, useEffect } from "react"
import { AuthContext } from "../../contexts/auth"
import { db } from "../../services/firebaseConnection"

import NavBar from "../../components/Nav/NavBar";
import Title from "../../components/Title/Title";

import { Link } from "react-router-dom";
import './Layout.css'

import { collection, query, getDocs } from "firebase/firestore"

export default function Home(){


    const [services,setServices] = useState<any[]>([])

    const {user}: any = useContext(AuthContext)

    useEffect(() => {
        async function loadServices() {
            const servicesRef = collection(db, 'users', user.uid, 'services')
            const q = query(servicesRef);
            const querySnapshot = await getDocs(q);
            let lists: any = []
            querySnapshot.forEach((doc: any) => {
                lists.push({
                    id: doc.id,
                    nomeCliente: doc.data().NomeCliente,
                    typeService: doc.data().typeService,
                    stateService: doc.data().stataService,

                })
            });
            setServices(lists);
        }
        loadServices();
    },[])

    return(
        <div className="container_layout">
            <NavBar/>
            <div className="content_layout">
                <Title title="chamados"/>
                <button><Link to={'/novo-serviço'}>Novo Chamado +</Link></button>
            </div>
            <div className="section_services">
                {services.map((service) => {
                    return(
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        Nome do Cliente:
                                    </th>
                                    <th>Serviço:</th>
                                    <th>Andamento:</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr key={service.id}>
                                    <th>
                                        {service.nomeCliente}
                                    </th>
                                    <th>
                                        {service.typeService}
                                    </th>
                                    <th>
                                        {service.stateService}
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    )
                })}

            </div>
        </div>
    )
}