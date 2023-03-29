import { useState, createContext, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebaseConnection";

export const AuthContext = createContext({});


function AuthProvider({children}: any){

    const [user, setUser]= useState<null>(null)

    async function logout() {
        await signOut(auth);
        localStorage.removeItem('@data_user')
        setUser(null);
    }
    
    return(
        <AuthContext.Provider value={{signed: !! user, user, logout}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;