import '../Login/user.css'
import { IoMdPaper} from 'react-icons/io'
import {Link, useNavigate} from 'react-router-dom'
import { auth } from '../../services/firebaseConnection'
import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'

export default function Register(){

    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const navigate = useNavigate();

    async function registerUser() {
        if (email !== '' && password !== '' && name !== ''){
            await createUserWithEmailAndPassword(auth, email, password)
        
        .then(()=>{
            navigate('/', {replace: true})
        })
        .catch((error) =>{
            console.log(error)
        })
    }else{
        alert('Preencha os campos corretamente!')
    }
    }

    return(
        <div className="container">
            <h1> <IoMdPaper/>Calleds</h1>
            <div className="section_user">
                <h2>Cadastro</h2>
                <span>Nome:</span>
                <input type="text" placeholder="Digite seu nome" value={name} onChange={((e) => setName(e.target.value))} />
                <span>Email:</span>
                <input type="text" placeholder="Digite seu email" value={email} onChange={((e) => setEmail(e.target.value))} />
                <span>Senha:</span>
                <input type="password" placeholder="Digite sua senha" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={registerUser} >Cadastrar</button>
                <Link to="/">Já tem uma conta ? Conecte-se</Link>
            </div>
        </div>
    )
}