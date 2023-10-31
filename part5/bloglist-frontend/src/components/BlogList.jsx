import { useEffect, useState } from 'react'
import { Blog } from './Blog'
import { Notification } from './Notification'
import { BlogForm } from './BlogForm'
import blogService from '../services/blogs'
import { Togglable } from './Togglable'

export const BlogList = ({ blogs, setBlogs, user, handleLogout }) => {

    const [message, setMessage] = useState(null)
    const [msgColor, setMsgColor] = useState('')

    useEffect(() => {
        const isUser = window.localStorage.getItem('user')
        if (isUser) {
            const result = JSON.parse(isUser)
            blogService.setToken(result.token)
        }
    }, [])

    const handleLike = async (blog) => {
        blog.likes = blog.likes + 1
        try {
            const { data } = await blogService.update(blog.id, blog)
            const updatedBlogs = blogs.map((e) => {
                if (e.id === blog.id) {
                    return { ...e, likes: data.likes }
                }
                return e
            })
            setBlogs(updatedBlogs)
        } catch (err) {
            const { error } = err.response.data
            setMsgColor('error')
            setMessage(error)
            setInterval(() => {
                setMessage(null)
            }, 5000)
        }
    }

    const handleDelete = async (id, title, author) => {
        const option = window.confirm(`Remove blog ${title} by ${author}?`)
        try {
            if (option) {
                const result = await blogService.del(id)
                console.log(result);
                const updatedBlogs = blogs.filter((blog) => blog.id !== id)
                setBlogs(updatedBlogs)
            }
        } catch (err) {
            const { error } = err.response.data
            setMsgColor('error')
            setMessage(error)
            setInterval(() => {
                setMessage(null)
            }, 5000)
        }
    }

    const handleCreate = async (blog) => {
        try {
            const { data } = await blogService.create(blog)
            setMsgColor('success')
            setMessage(`a new blog ${data.title} by ${data.author} added`)
            setBlogs(blogs.concat(data))
            setInterval(() => {
                setMessage(null)
            }, 5000)

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
        <div>
            <h1>Blogs</h1>
            {message && <Notification message={message} color={msgColor} />}
            <div style={{ paddingBottom: 10 }}>
                <span>{user.username} logged in </span>
                <button onClick={handleLogout}>logout</button>
            </div>
            <div>
                <Togglable buttonLabel='new blog'>
                    <BlogForm handleCreate={handleCreate} />
                </Togglable>
            </div>
            <div>
                {blogs.sort((a, b) => {
                    if (a.likes < b.likes) return 1
                    if (a.likes > b.likes) return -1
                    return 0
                }).map(blog =>
                    <Blog
                        key={blog.id}
                        blog={blog}
                        handleLike={handleLike}
                        handleDelete={handleDelete}
                        user={user}
                    />
                )}
            </div>
        </div>
    )
}
