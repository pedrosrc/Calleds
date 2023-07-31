import { useState, createContext, useEffect } from "react";
import { auth, db } from "../services/firebaseConnection";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDoc, setDoc, doc, addDoc, collection, deleteDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'

export const AuthContext = createContext({});

function AuthProvider({children}: any){

    const [user, setUser] = useState<any>(null)
    const [service, setService] = useState<any>(null)
    const [loadingAuth, setLoadingAuth] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
   

    const navigate = useNavigate();

    useEffect(()=>{
        async function loadUser() {
            const storageUser = localStorage.getItem('@dataCalled')

            if(storageUser){
                setUser(JSON.parse(storageUser))
                setLoading(false);
            }
            setLoading(false);
            
        }
        loadUser();
    }, [])
    
    //CADASTRO DE USER NOVO
    async function signUp(email: string, password:string, name: string){
        
        setLoadingAuth(true);

        await createUserWithEmailAndPassword(auth, email, password)
        .then( async (value) => {
            let uid = value.user.uid

            await setDoc(doc(db, "users", uid), {
                nome: name, 
                avatarUrl: null
            })
            .then( () => {

                let data = {
                    uid: uid,
                    nome: name,
                    email: value.user.email,
                    avatarUrl: null
                };

                setUser(data); 
                storageUser(data);
                setLoadingAuth(false);
                toast.success('Cadastro feito com sucesso')
                navigate("/")
            })
            
        })
        .catch((error)=>{
            console.log(error);
            alert('Digite seus dados corretamente!')
            setLoadingAuth(false);
        })
    }
    // LOGIN DE USUARIO
    async function signIn(email: string, password: any) {
        setLoadingAuth(true);

        await signInWithEmailAndPassword(auth, email, password)
        .then(async(value) => {
            let uid = value.user.uid;

            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef)

            let data ={
                uid: uid,
                nome: docSnap.data()?.nome,
                email: value.user.email,
                avatarUrl: docSnap.data()?.avatarUrl
            }
            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
            toast.success('Login feito com sucesso!')
            navigate("/home")
        })
        .catch((error)=>{
            console.log(error)
            setLoadingAuth(false);
            toast.error('Email/Senha está incorreta!')
        })
        
    }
    //Adicionando CLiente
    async function addCliente(nomeCliente:string, numberCliente:number[], emailCliente:string){
        await addDoc(collection(db, 'users', user.uid, 'clientes'), {
            NomeCliente: nomeCliente,
            NumeroCliente: numberCliente,
            EmailCliente: emailCliente
        })
        .then(()=>{
            toast.success('Cliente Adicionado')
        })
        .catch((error)=>{
            toast.error('Algo deu errado!')
            console.log(error)
        })
    }
    //Excluindo Cliente
    async function deleteCliente(id: any){
        const clienteRef = doc(db, 'users', user.uid, 'clientes', id)
        await deleteDoc(clienteRef)
    }

    function storageUser(data: any){
        localStorage.setItem('@dataCalled', JSON.stringify(data))
    }


    //Adicionando Servico
    async function addService(nomeCliente:string, typeService:string, stateService:string){
        await addDoc(collection(db, 'users', user.uid, 'services'), {
            NomeCliente: nomeCliente,
            typeService: typeService,
            stateService: stateService,
        })
        .then(()=>{
            toast.success('Serviço Criado')
            navigate('./home')
        })
        .catch((error)=>{
            toast.error('Algo deu errado!')
            console.log(error)
        })
    }
    // Editando Service
    async function editService(nomeCliente:string, typeService:string, stateService:string, id: any) {
        const serviceRef = doc(db, 'users', user.uid, 'services', service.uid)
        await updateDoc(serviceRef, {
            NomeCliente: nomeCliente,
            typeService: typeService,
            stateService: stateService,
        })
        .then(()=>{
            toast.success('Serviço Editado')
            navigate('./home')
        })
        .catch((error)=>{
            toast.error('Algo deu errado!')
            console.log(error)
        })
    }

    //LOGOUT DE USER
    async function logout() {
        await signOut(auth);
        localStorage.removeItem('@dataCalled')
        setUser(null);
    }
    
    return(
        <AuthContext.Provider value={{signed: !!user,
            user,
            signIn,
            signUp,
            logout,
            storageUser,
            setUser,
            editService,
            addCliente,
            deleteCliente,
            addService,
            loadingAuth,
            loading}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;