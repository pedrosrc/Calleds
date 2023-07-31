import { useState, useContext, useEffect } from "react"
import { AuthContext } from "../../contexts/auth"
import { db } from "../../services/firebaseConnection"
import { useParams } from "react-router-dom"

import NavBar from "../../components/Nav/NavBar"

import { doc,collection, query, getDocs } from "firebase/firestore"

export default function EditCustumer(){

    const {service} = useParams();
    const [services, setServices] = useState<any[]>([])
    const { user, editService }: any = useContext(AuthContext)

    useEffect(() => {
        async function loadService() {
            const serviceRef = collection(db, 'users', user.uid, 'services')
            const q = serviceRef;
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
        loadService();
    }, []);

    return(
        <div>
            <NavBar/>
            <div className="container_edit">
            {services.map((service) => {
                        return (
                                <div>
                                    <input type="text" value={service.nomeCliente} />
                                </div>
                        )
                    })}

            </div>
        </div>
    )
};