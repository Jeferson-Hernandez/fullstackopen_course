const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const total = blogs.reduce((sum, value) => {
        return sum + value.likes
    }, 0)
    return total
}

const favoriteBlog = (blogs) => {
    let likes = 0
    let result
    blogs.map((blog) => {
        if (blog.likes > likes) {
            likes = blog.likes
            result = {
                title: blog.title,
                author: blog.author,
                likes: blog.likes
            }
        }
    })
    console.log(result);
    return result
}

const mostBlogs = (blogs) => {
    let blog
    let likes = 0
    _.chain(blogs)
        .countBy((blog) => (blog.author))
        .forEach((value, key) => {
            if (value > likes) {
                likes = value
                blog = {
                    author: key,
                    blogs: value
                }
            }
        })
        .value()
    return blog
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
}