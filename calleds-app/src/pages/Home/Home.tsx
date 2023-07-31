import { useState, useContext, useEffect } from "react"
import { AuthContext } from "../../contexts/auth"
import { db } from "../../services/firebaseConnection"

import NavBar from "../../components/Nav/NavBar";
import Title from "../../components/Title/Title";

import { Link} from "react-router-dom";
import { IoMdOptions } from 'react-icons/io'
import './Layout.css'

import { collection, query, getDocs } from "firebase/firestore"

export default function Home() {


    const [services, setServices] = useState<any[]>([])

    const { user }: any = useContext(AuthContext)

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
                    stateService: doc.data().stateService,
                })
            });
            setServices(lists);
        }
        loadServices();
    }, [])

    

    return (
        <div className="container_layout">
            <NavBar />
            <div className="container_home">
                <div className="content_layout">
                    <Title title="chamados" />
                    <button><Link to={'/novo-serviço'}>Novo Chamado +</Link></button>
                </div>
                <div className="section_services">
                <table className="table_services">
                    <thead>
                        <tr>
                            <th>
                                Nome do Cliente:
                            </th>
                            <th>Serviço:</th>
                            <th>Andamento:</th>
                        </tr>
                    </thead>
                    {services.map((service) => {
                        return (
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
                                        <th>
                                            <Link to ={`/editar/${service.id}`}>
                                                <IoMdOptions size={24} />
                                            </Link>
                                        </th>
                                    </tr>
                                </tbody>
                        )
                    })}
                    </table>
                </div>
            </div>
        </div>
    )
}