import { useState, createContext, useEffect } from "react";
import { auth, db } from "../services/firebaseConnection";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDoc, setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

function AuthProvider({children}: any){

    const [user, setUser] = useState<any>(null)
    const [loadingAuth, setLoadingAuth] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const navigate = useNavigate();

    useEffect(()=>{
        async function loadUser() {
            const storageUser = localStorage.getItem('@data_user')

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
            .then(() => {
                let data = {
                    uid: uid,
                    nome: name,
                    email: value.user.email,
                    avatarUrl: null
                };

                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
                navigate("/")
            })
            
        })
        .catch((error)=>{
            console.log(error);
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
            navigate("/home")
        })
        .catch((error)=>{
            console.log(error)
            setLoadingAuth(false);
        })
        
    }

    function storageUser(data: any){
        localStorage.setItem('@data_user', JSON.stringify(data))
    }

    //LOGOUT DE USER
    async function logout() {
        await signOut(auth);
        localStorage.removeItem('@data_user')
        setUser(null);
    }
    
    return(
        <AuthContext.Provider value={{signed: !!user,
            user,
            signIn,
            signUp,
            logout,
            loadingAuth,
            loading}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;