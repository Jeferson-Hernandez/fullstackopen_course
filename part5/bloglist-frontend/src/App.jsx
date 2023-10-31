import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import { BlogList } from './components/BlogList'
import { LoginForm } from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const isUser = window.localStorage.getItem('user')
    if (isUser) {
      const result = JSON.parse(isUser)
      setUser(result)
      blogService.setToken(result.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <div>
      {user === null
        ? <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          setUser={setUser}
        /> : <BlogList
          handleLogout={handleLogout}
          blogs={blogs}
          setBlogs={setBlogs}
          user={user}
        />
      }
    </div>
  )
}

export default App