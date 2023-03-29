import './App.css'
import Nav from './components/Nav/Nav'
import AuthProvider from './contexts/auth'

function App() {
  return (
    <div>
      <AuthProvider>
        <Nav />
      </AuthProvider> 
    </div>
  )
}

export default App
