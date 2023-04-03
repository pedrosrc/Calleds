import { AuthContext } from "../../contexts/auth";
import { Navigate } from "react-router-dom";
import {useContext} from 'react'


export default function Privade({children}: any){
    
    const {signed, loading}:any = useContext(AuthContext);

    if(loading){
        return(
            <div>Loading...</div>
        )     
    }else if(!signed){
        return<Navigate to="/"/>
    }
    return children;
}
