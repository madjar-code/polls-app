import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import AllPollsPage from './pages/AllPollsPage'
import PollPage from './pages/PollPage'
import { AuthProvider } from './context/AuthContext'

import './App.css'
import AllProfiles from './pages/AllProfiles'
import Footer from './components/Footer'


function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/all-polls' element={<AllPollsPage/>}/>
          <Route path='/all-profiles' element={<AllProfiles/>}/>
          <Route path='/:pollSlug' element={<PollPage/>}/>
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App;