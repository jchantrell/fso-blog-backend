const supertest = require('supertest')
const helper = require('../utils/userTestHelper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')


describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: '5char',
            name: 'a user',
            password: 'random',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })
})

describe('api responds properly when user requests are sent', () => {
    test('username with less than 3 chars returns bad response', async () => {
        const newUser = {
            username: '12',
            name: 'user',
            password: '123',
        }

        const request = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        expect(request.status).toEqual(400)
    })

    test('password with less than 3 chars returns bad response', async () => {
        const newUser = {
            username: '123',
            name: 'user',
            password: '12',
        }

        const request = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        expect(request.status).toEqual(400)
    })

    test('username must be unique', async () => {
        const firstUser = {
            username: '123',
            name: 'user',
            password: '12',
        }

        const secondUser = {
            username: '123',
            name: 'user',
            password: '12',
        }

        await api
            .post('/api/users')
            .send(firstUser)

        const secondRequest = await api
            .post('/api/users')
            .send(secondUser)
            .expect(400)

        expect(secondRequest.status).toEqual(400)
    })
})