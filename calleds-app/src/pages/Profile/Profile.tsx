import { useContext, useState } from "react"
import { AuthContext } from "../../contexts/auth"

import NavBar from "../../components/Nav/NavBar"

import { doc, updateDoc } from "firebase/firestore"
import { db, storage } from "../../services/firebaseConnection"
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'


import Title from "../../components/Title/Title"
import avatar from '../../assets/profile-user.png'
import { FiUpload } from "react-icons/fi"

import './profile.css'
export default function Profile() {

    const { user, storageUser, setUser }: any = useContext(AuthContext);

    const [avatarUrl, setAvatarUrl] = useState<any>(user && user.avatarUrl)
    const [imageAvatar, setImageAvatar] = useState<any>(null)

    const [nome, setNome] = useState<any>(user && user.nome)
    const [email, setEmail] = useState<any>(user && user.email)

    function handleFile(e:any){
        if(e.target.files[0]){
            const image = e.target.files[0];

            if(image.type === 'image/jpeg' || image.type === 'image/png'){
                setImageAvatar(image)
                setAvatarUrl(URL.createObjectURL(image))
            }else{
                alert('Envie uma imagem no formato JPEG ou PNG !')

            }

        }

    }

    async function handleUpload(){

        const currentuid:any = user.uid;

        const uploadRef = ref(storage, `images/${currentuid}/${imageAvatar.name}` )

        const uploadTask = uploadBytes(uploadRef, imageAvatar)
        .then((snapshot)=>{
            getDownloadURL(snapshot.ref).then(async (downloadURL) =>{
                let urlPhoto = downloadURL;

                const docRef = doc(db, 'users', user.uid)
                await updateDoc(docRef, {
                    avatarUrl: urlPhoto,
                    nome: nome,
                })
                .then(()=>{
                    let data ={
                        ...user,
                        nome: nome,
                        avatarUrl: urlPhoto
                    }
                    setUser(data)
                    storageUser(data);
                })

            })
        })
        
    }

    async function handleSave(e:any){
        e.preventDefault();
        if(imageAvatar === null && nome !== ''){
            //Alterando nome sem imagem
            const docRef = doc(db, 'users', user.uid)
            await updateDoc(docRef, {
                nome: nome
            })
            .then(()=>{
                let data ={
                    ...user,
                    nome: nome
                }
                setUser(data)
                storageUser(data);
            })

        } else if(imageAvatar !== null && nome !== ''){
            //Alterando nome Com imagem
            handleUpload();

        }
    }

    return (
        <div className="container_profile">
            <NavBar />

            <div className="content">
                <Title title="Configurações" />
                <div className="container_user">
                    <form className="form_profile" onSubmit={handleSave}>
                        <h1>Edite Seu Perfil:</h1>
                        <label className="avatar_label">
                            <span><FiUpload color="#fff" size={25} /></span>
                            <input type="file" accept="image/*" onChange={handleFile}/> <br />
                            {avatarUrl === null ? (
                                <img src={avatar} alt="foto de perfil" width={250} />
                            ) : (
                                <img src={avatarUrl} alt="foto de perfil" width={250} />
                            )}
                            </label>
                            <div className="info_user">
                            <label>
                                Nome:
                            </label>
                            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)}/>
                            <label>
                                Email
                            </label>
                            <input type="text" value={email} disabled={true}/>

                            <button type="submit">Salvar</button>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    )
}