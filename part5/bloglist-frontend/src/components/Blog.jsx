import { useState } from 'react'

export const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      {!showDetails
        ? <div className='blog' style={blogStyle}>{blog.title} {blog.author} <button onClick={() => setShowDetails(!showDetails)}>view</button></div>
        : <div className='blog' style={blogStyle}>
          <span>{blog.title} {blog.author} <button onClick={() => setShowDetails(!showDetails)}>hide</button></span><br />
          <span>{blog.url}</span> <br />
          <span>likes {blog.likes} <button onClick={() => handleLike(blog)} >like</button></span><br />
          <span>{blog.author}</span>
          {
            blog.user?.username === user.username && <button onClick={() => handleDelete(blog.id, blog.title, blog.author)}>delete</button>
          }

        </div>
      }
    </div>

  )
}
