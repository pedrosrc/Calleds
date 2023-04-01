import './App.css'
import Nav from './components/Nav/Nav'
import AuthProvider from './contexts/auth'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (

    <BrowserRouter>
      <AuthProvider>
        <Nav />
      </AuthProvider>
    </BrowserRouter>

  )
}

export default App
