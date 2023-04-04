import { useContext, useState } from "react"
import NavBar from "../../components/Nav/NavBar"
import Title from "../../components/Title/Title"
import avatar from '../../assets/profile-user.png'
import { AuthContext } from "../../contexts/auth"
import { FiUpload } from "react-icons/fi"

import './profile.css'
export default function Profile() {

    const { user }: any = useContext(AuthContext);

    const [avatarUrl, setAvatarUrl] = useState<any>(user && user.avatarUrl)

    return (
        <div className="container_profile">
            <NavBar />

            <div className="content">
                <Title title="Configurações" />
                <div className="container_user">
                    <form className="form_profile">
                        <h1>Edite Seu Perfil:</h1>
                        <label className="avatar_label">
                            <span><FiUpload color="#fff" size={25} /></span>
                            <input type="file" accept="image/*" /> <br />
                            {avatarUrl === null ? (
                                <img src={avatar} alt="foto de perfil" width={250} />
                            ) : (
                                <img src={avatarUrl} alt="foto de perfil" width={250} />
                            )}
                            </label>
                            <div className="info_user">
                            <label>
                                Nome
                            </label>
                            <input type="text" placeholder="Seu nome" />
                            <label>
                                Email
                            </label>
                            <input type="text" placeholder="Seu email" disabled={true}/>

                            <button type="submit">Salvar</button>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    )
}