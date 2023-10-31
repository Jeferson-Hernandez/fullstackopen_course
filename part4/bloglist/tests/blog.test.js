const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
}, 200000)

test('return all blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length)
})

describe('adding blogs', () => {

    test('Verify if column _id is id', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })

    test('Verify blog is saved', async () => {
        const newBlog = {
            title: "Tailwind is speed",
            author: "Mario Baracus",
            url: "ulr.tailwind",
            likes: 50
        }

        const userLogin = {
            username: 'Arto hellas',
            password: 'arto123'
        }

        const login = await api
            .post('/api/login')
            .send(userLogin)

        const token = login.body.token

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `bearer ${token}`)
            .expect(201)

        const response = await api.get('/api/blogs')
        const result = response.body.map(blog => blog.title)

        expect(result).toContain('Tailwind is speed')
        expect(result.length).toBe(helper.initialBlogs.length + 1)
    })

    test('Likes value is 0 by default', async () => {
        const newBlog = {
            title: "Blog with no likes",
            author: "Dj Mario",
            url: "ulr.lol"
        }

        const userLogin = {
            username: 'Arto hellas',
            password: 'arto123'
        }

        const login = await api
            .post('/api/login')
            .send(userLogin)

        const token = login.body.token

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `bearer ${token}`)
            .expect(201)

        const response = await api.get('/api/blogs')
        const lastBlog = response.body[response.body.length - 1]
        expect(lastBlog.likes).toBe(0)
    })

    test('title and url are required', async () => {
        const newBlog = {
            url: "ulr.lol",
            likes: 10
        }

        const userLogin = {
            username: 'Arto hellas',
            password: 'arto123'
        }

        const login = await api
            .post('/api/login')
            .send(userLogin)

        const token = login.body.token

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `bearer ${token}`)
            .expect(400)
    })

    test('post without token is Unauthorize', async () => {
        const newBlog = {
            url: "ulr.lol",
            likes: 10
        }

        const userLogin = {
            username: 'Arto hellas',
            password: 'arto123'
        }

        const login = await api
            .post('/api/login')
            .send(userLogin)

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
    })
})

describe('deleting blogs', () => {
    test('status 204 after deleted', async () => {
        const blogs = await helper.blogsInDb()
        const blogId = blogs[0].id

        const userLogin = {
            username: 'Arto hellas',
            password: 'arto123'
        }

        const login = await api
            .post('/api/login')
            .send(userLogin)

        const token = login.body.token

        await api
            .delete(`/api/blogs/${blogId}`)
            .set('Authorization', `bearer ${token}`)
            .expect(204)

    })

    test('check lenght after deleted', async () => {
        const blogs = await helper.blogsInDb()
        const blogId = blogs[0].id

        const userLogin = {
            username: 'Arto hellas',
            password: 'arto123'
        }

        const login = await api
            .post('/api/login')
            .send(userLogin)

        const token = login.body.token

        await api
            .delete(`/api/blogs/${blogId}`)
            .set('Authorization', `bearer ${token}`)
            .expect(204)

        const newBlogsDb = await helper.blogsInDb()
        expect(newBlogsDb.length).toBe(helper.initialBlogs.length - 1)
    })
})

describe('updating blogs', () => {
    test('return updated blog', async () => {
        const blogs = await helper.blogsInDb()
        const blog = blogs[0]
        const blogId = blogs[0].id
        blog.likes = 60

        const updatedBlog = api
            .put(`/api/blogs/${blogId}`)
            .send(blog)

        expect(updatedBlog._data).toEqual(blog)
    })
})

afterAll(() => {
    mongoose.connection.close()
})