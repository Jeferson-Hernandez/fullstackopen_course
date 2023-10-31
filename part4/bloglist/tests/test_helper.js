const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: "The truth about react",
        author: "El que te cuento",
        url: "ulr.test",
        likes: 20,
        user: '653883b05c0391d2b0cc853a'
    },
    {
        title: "The truth about VIM",
        author: "Richard",
        url: "ulr.vim",
        likes: 10,
        user: '653883b05c0391d2b0cc853a'
    },
]

const initialUsers = [
    {
        name: "hellas",
        username: "Arto hellas",
        passwordHash: "$2b$10$Eua.G88h2xWOJ6ih9xzaCOCJhPzMTsqeYy15H8lzYwLRXLOSH.6h2"
    },
    {
        name: "carlos",
        username: "Carlos hellas",
        passwordHash: "$2b$10$h4d27.RQxGHpI4RDdb5Ky.bZRi2xoPrlHwuPlKOZAmQc8syyfGDMa"
    },
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs, initialUsers, blogsInDb, usersInDb
}