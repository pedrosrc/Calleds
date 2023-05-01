import './NavBar.css'
import avatarImg from '../../assets/profile-user.png'
import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/auth'
import { Link } from 'react-router-dom'
import { RiFileList3Line } from 'react-icons/ri'
import { FiUsers } from 'react-icons/fi'
import { AiOutlineSetting } from 'react-icons/ai'
import { TbDoorExit } from 'react-icons/tb'
import './NavBar.css'

export default function NavBar() {


  const { user, setUser, localStorage }: any = useContext(AuthContext);
  const { logout }: any = useContext(AuthContext);

  const [name, setName] = useState<any>(user && user.nome)

  const [isExpended, setIsExpended] = useState<boolean>(false);

  async function handleLogout() {
    await logout();
  }

  return (
    <div className={isExpended ? 'sidebar' : 'sidebar sidebar_NX'}>
      <div className="nav_upper">
        <div className="nav_heading">
          {isExpended && (
          <div className='image_profile'>
            <img src={user.avatarUrl === null ? avatarImg : user.avatarUrl} /> 
            <span>{name}</span>
          </div>)}
          <button className={isExpended ? 'list_nav list_nav_in' : 'list_nav list_nav_out'} onClick={() => setIsExpended(!isExpended)} >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div className='nav'>

          <Link to='/home' className={isExpended ? 'menu_item' : 'menu_item menu_item_NX'}> <RiFileList3Line /> {isExpended && <p>Chamados</p>}
            {!isExpended && <div className="tooltip"><p>Chamados</p></div>}
          </Link>

          <Link to="/clientes" className={isExpended ? 'menu_item' : 'menu_item menu_item_NX'}> <FiUsers /> {isExpended && <p>Clientes</p>}
            {!isExpended && <div className="tooltip"><p>Clientes</p></div>}
          </Link>

          <Link to='/perfil' className={isExpended ? 'menu_item' : 'menu_item menu_item_NX'}> <AiOutlineSetting /> {isExpended && <p>Configurações</p>}
            {!isExpended && <div className="tooltip"><p>Configurações</p></div>}
          </Link>


        </div>

        <button onClick={handleLogout} className={isExpended ? 'menu_item' : 'menu_item menu_item_NX'}> <TbDoorExit /> {isExpended && <p>Sair</p>} {!isExpended && <div className="tooltip"><p>Sair</p></div>} </button>
      </div>




    </div>
  )
}