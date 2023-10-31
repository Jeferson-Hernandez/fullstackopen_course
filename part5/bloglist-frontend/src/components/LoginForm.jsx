import { useState } from "react"
import { Notification } from "./Notification"
import loginService from '../services/login'

export const LoginForm = ({ username, password, setUsername, setPassword, setUser }) => {

    const [message, setMessage] = useState(null)
    const [msgColor, setMsgColor] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const userData = await loginService.login({ username, password })
            window.localStorage.setItem('user', JSON.stringify(userData))
            setUser(userData)
            setUsername('')
            setPassword('')
        } catch (err) {
            const { error } = err.response.data
            setMsgColor('error')
            setMessage(error)
            setInterval(() => {
                setMessage(null)
            }, 5000)
        }
    }

    return (
        <>
            <h1>Log in to application</h1>
            {message && <Notification message={message} color={msgColor} />}
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">username</label>
                    <input type="text" value={username} onChange={({ target }) => setUsername(target.value)} id="username" />
                </div>
                <div>
                    <label htmlFor="password">password</label>
                    <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} id="password" />
                </div>
                <button id="login" type="submit">login</button>
            </form>
        </>
    )
}
