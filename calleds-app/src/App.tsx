import './App.css'
import Nav from './components/Nav/Nav'
import AuthProvider from './contexts/auth'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (

    <BrowserRouter>
      <AuthProvider>
        <Nav />
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </AuthProvider>
    </BrowserRouter>

  )
}

export default App
