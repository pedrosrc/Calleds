import './user.css'
import {useState} from 'react'
import { IoMdPaper } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../services/firebaseConnection'

export default function Login() {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const navigate = useNavigate();

    async function loginUser () {
        if(email !== '' && password !== ''){
            await signInWithEmailAndPassword(auth, email, password) 
            .then(() =>{
                navigate('/home', {replace:true})
            })
            .catch((error) =>{
                alert('Email/Senha Invalidos!')
                console.log(error)
            })
        }else{
            alert('Email/Senha Invalidos!')
        }
        
    }

    return (
        <div className="container">
            <h1> <IoMdPaper />Calleds</h1>
            <div className="section_user">
                <h2>Login</h2>
                <span>Email:</span>
                <input type="text" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <span>Senha:</span>
                <input type="password" placeholder="Digite sua senha" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={loginUser}>Entrar</button>
                <Link to="/register">Não tem conta ? Cadastre-se</Link>
            </div>
        </div>
    )
}