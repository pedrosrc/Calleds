import './user.css'
import { IoMdPaper} from 'react-icons/io'

export default function Login(){
    return(
        <div className="container">
            <h1> <IoMdPaper/>Calleds</h1>
            <div className="section_user">
                <h2>Login</h2>
                <span>Email:</span>
                <input type="text" placeholder="Digite seu email" />
                <span>Senha:</span>
                <input type="password" placeholder="Digite sua senha" />
                <p>Nao tem conta ? Cadastre-se</p>
            </div>
        </div>
    )
}