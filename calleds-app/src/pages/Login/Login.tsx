import './user.css'
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
import { IoMdPaper } from 'react-icons/io'
import { Link } from 'react-router-dom'

export default function Login() {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const { signIn, loadingAuth }: any = useContext(AuthContext);

    async function loginUser(e: any) {
        e.preventDefault();
        if (email !== '' && password !== '') {
            await signIn(email, password);
        }
    }

    return (
        <div className="container">
            <h1> <IoMdPaper />Calleds</h1>
            <form onSubmit={loginUser} className="section_user">
                <h2>Login</h2>
                <span>Email:</span>
                <input type="text" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <span>Senha:</span>
                <input type="password" placeholder="Digite sua senha" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type='submit'>{loadingAuth ? "Carregando.." : "Entrar"}</button>
                <Link to="/register">Não tem conta ? Cadastre-se</Link>
            </form>
        </div>
    )
}