import './NavBar.css'
import avatarImg from '../../assets/pedro-3.jpg'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth'

export default function NavBar(){

  const { user }:any = useContext(AuthContext);

  return(
    <div className='sidebar'>
      <header>
        <div className='image_profile'>
        <img src={user.avatarUrl === null ? avatarImg : user.avatarUrl}/>
        </div>

      </header>
    </div>
  )
}