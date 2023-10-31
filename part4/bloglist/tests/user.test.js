const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})
    const userObjects = helper.initialUsers
        .map(user => new User(user))
    const promiseArray = userObjects.map(user => user.save())
    await Promise.all(promiseArray)
}, 200000)

describe('making bad users request', () => {
    test('user without username', async () => {
        const user = {
            name: 'Tiago',
            password: 'tiago123'
        }

        await api
            .post('/api/users')
            .send(user)
            .expect(400)
    })

    test('user without password', async () => {
        const user = {
            name: 'Tiago',
            username: 'Tiagito'
        }

        await api
            .post('/api/users')
            .send(user)
            .expect(400)
    })

    test('username less or equal than 3 char', async () => {
        const user = {
            name: 'Tiago',
            username: 'tia',
            password: 'tiago123'
        }

        await api
            .post('/api/users')
            .send(user)
            .expect(400)
    })

    test('password less or equal than 3 char', async () => {
        const user = {
            name: 'Tiago',
            username: 'tiagito',
            password: '12'
        }

        await api
            .post('/api/users')
            .send(user)
            .expect(400)
    })
})

afterAll(() => {
    mongoose.connection.close()
})