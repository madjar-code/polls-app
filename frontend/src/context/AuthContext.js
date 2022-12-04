import { 
  createContext,
  useState,
  useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";


const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({ children }) => {
  let [authTokens, setAuthTokens] = useState(
    () => localStorage.getItem('authTokens')
          ? JSON.parse(localStorage.getItem('authTokens'))
          : null)
  let [user, setUser] = useState(
    () => localStorage.getItem('authTokens')
          ? jwt_decode(localStorage.getItem('authTokens'))
          : null)
  let [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  const loginUser = async (credentials) => {
    let response = await fetch('/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    let data = await response.json()

    if (response.status === 200) {
      setAuthTokens(data)
      setUser(jwt_decode(data.access))
      localStorage.setItem('authTokens', JSON.stringify(data))
      navigate('/profile')
    }
    else {
      alert('Некорректные данные!')
    }
  }

  const signupUser = async (credentials) => {
    let response = await fetch('/api/users/create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })

    if (response.status == 201) {
      loginUser(credentials)
    }
    else {
      alert('Некорректные данные')
    }
  }

  const logoutUser = () => {
    setAuthTokens(null)
    setUser(null)
    localStorage.removeItem('authTokens')
  }

  const updateToken = async () => {
    let response = await fetch('/api/token/refresh/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 'refresh': authTokens?.refresh })
    })

    let data = await response.json()

    if (response.status === 200) {
      setAuthTokens(data)
      setUser(jwt_decode(data.access))
      localStorage.setItem('authTokens', JSON.stringify(data))
    } else {
      logoutUser()
    }

    if (loading) {
      setLoading(false)
    }
  }

  let contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
    signupUser: signupUser,
  }


  useEffect(() => {
    if (loading) {
      updateToken()
    }
    let fiveMinutes = 1000 * 60 * 5
    let interval = setInterval(() => {
      if (authTokens) {
        updateToken()
      }
    }, fiveMinutes)
    return () => clearInterval(interval)

  }, [authTokens, loading])

  return (
    <AuthContext.Provider value={contextData} >
      {loading ? null : children}
    </AuthContext.Provider>
  )
}
