import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import SignInpage from './pages/SignInpage'
import AdminSignInPage from './pages/AdminSignInPage'
import HomePage from './pages/HomePage'
import AdminHomepage from './pages/AdminHomepage'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/register' element={<RegisterPage />}/>
      <Route path='/signin' element={<SignInpage />}/>
      <Route path='/' element={<HomePage />}/>
      <Route path='/admin' element={<AdminSignInPage />}/>
      <Route path='/admin/home' element={<AdminHomepage />}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
