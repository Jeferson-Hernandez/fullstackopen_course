import { useState } from "react"

export const BlogForm = ({ handleCreate }) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    return (
        <>
            <h1>Create new</h1>
            <form onSubmit={() => handleCreate({ title, author, url })} style={{ paddingBottom: 20 }}>
                <div>
                    <label htmlFor="title">title: </label>
                    <input type="text" value={title} onChange={({ target }) => setTitle(target.value)} id="title" />
                </div>
                <div>
                    <label htmlFor="author">author: </label>
                    <input type="text" value={author} onChange={({ target }) => setAuthor(target.value)} id="author" />
                </div>
                <div>
                    <label htmlFor="url">url: </label>
                    <input type="text" value={url} onChange={({ target }) => setUrl(target.value)} id="url" />
                </div>
                <button id="create" type='Submit'>create</button>
            </form>
        </>
    )
}
