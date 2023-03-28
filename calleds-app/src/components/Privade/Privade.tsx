import { useState, useEffect, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../../services/firebaseConnection";
import { onAuthStateChanged } from "firebase/auth";


export default function Privade({children}: any){
    const [loading, setLoading]= useState(true);
    const [signed, setSigned] = useState(false);

    useEffect(()=>{
        async function checkLogin(){
            const unsub = onAuthStateChanged(auth, (user)=>{
                if(user){
                    const userData = {
                        uid: user.uid,
                        email: user.email
                    }
                    localStorage.setItem('@data_user',  JSON.stringify(userData))
                    setLoading(false)
                    setSigned(true)
                }else{
                    setLoading(false);
                    setSigned(false);
                }
            }) 
        }
        checkLogin();
    },[])    
    if(loading){
        <div>Loading...</div>
    }else if(!signed){
        return<Navigate to="/"/>
    }
    return children;
}
