import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import { useEffect, useState } from 'react'
import './styles/App.css'
import axios from 'axios'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('')

  useEffect(() => {
    if(!loggedIn) {
      return
    }
    axios
    .post('/auth', {
    })
    .then((r) => {
      if ('success' === r.data.message) {
        setEmail(r.data.email)
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    });
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
                <Route
                    path="/"
                    element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}/>
                <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App