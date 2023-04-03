import '../Login/user.css'
import { IoMdPaper} from 'react-icons/io'
import {Link, useNavigate} from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'
import { useState, useContext } from 'react'


export default function Register(){

    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const {signUp, loadingAuth}:any = useContext(AuthContext);

    async function registerUser(e: any) {
        e.preventDefault();
        if (email !== '' && password !== '' && name !== ''){
            await signUp(email, password, name)
        }
    }

    return(
        <div className="container">
            <h1> <IoMdPaper/>Calleds</h1>
            <form onSubmit={registerUser} className="section_user">
                <h2>Cadastro</h2>
                <span>Nome:</span>
                <input type="text" placeholder="Digite seu nome" value={name} onChange={((e) => setName(e.target.value))} />
                <span>Email:</span>
                <input type="text" placeholder="Digite seu email" value={email} onChange={((e) => setEmail(e.target.value))} />
                <span>Senha:</span>
                <input type="password" placeholder="Digite sua senha" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type='submit'>{loadingAuth? "Cadastrando..." : "Cadastrar"}</button>
                <Link to="/">Já tem uma conta ? Conecte-se</Link>
            </form>
        </div>
    )
}