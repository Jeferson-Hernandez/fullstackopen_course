const bcrypt = require('bcrypt');

const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 })
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const body = request.body

    if (!body.username || !body.password) {
        response.status(400).json({ error: 'content missing' })
    }

    if (body.password <= 3 || body.username <= 3) {
        response.status(400).json({ error: 'password is less than 3 char' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        name: body.name,
        username: body.username,
        passwordHash
    })

    const result = await user.save()
    response.json(result)
})

module.exports = usersRouter