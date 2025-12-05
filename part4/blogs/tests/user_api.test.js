const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

describe('user API with existing users', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
  })

  test('all users are returned as json', async () => {
    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, helper.initialUsers.length)

    const usernames = response.body.map(u => u.username)
    assert(usernames.includes(helper.initialUsers[0].username))
  })

  describe('adding a new user', () => {
    test('with valid data works', async () => {
      let newUser = helper.newUser()

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, helper.initialUsers.length + 1)

      let userInDb = usersAtEnd.find(u => u.username === newUser.username)
      delete userInDb.id // This gets dynamically added by MongoDB, so can't be compared
      delete userInDb.passwordHash // This gets dynamically calculated, so can't be compared
      delete newUser.password
      assert.deepStrictEqual(userInDb, newUser)
    })

    test('with a missing/invalid username returns a 400 error', async () => {
      let newUser = helper.newUser()

      delete newUser.username
      let response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
      assert(response.body.error.includes('username'))

      let usersInDb = await helper.usersInDb()
      assert.strictEqual(usersInDb.length, helper.initialUsers.length)

      newUser.username = 'aa'
      response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
      assert(response.body.error.includes('username'))

      usersInDb = await helper.usersInDb()
      assert.strictEqual(usersInDb.length, helper.initialUsers.length)
    })

    test('with a duplicate username returns a 400 error', async () => {
      let newUser = helper.newUser()

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      let usersInDb = await helper.usersInDb()
      assert.strictEqual(usersInDb.length, helper.initialUsers.length + 1)

      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
      assert(response.body.error.includes('username'))

      usersInDb = await helper.usersInDb()
      assert.strictEqual(usersInDb.length, helper.initialUsers.length + 1)
    })

    test('with a missing/invalid password returns a 400 error', async () => {
      let newUser = helper.newUser()

      delete newUser.password
      let response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
      assert(response.body.error.includes('password'))

      let usersInDb = await helper.usersInDb()
      assert.strictEqual(usersInDb.length, helper.initialUsers.length)

      newUser.password = 'aa'
      response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
      assert(response.body.error.includes('password'))

      usersInDb = await helper.usersInDb()
      assert.strictEqual(usersInDb.length, helper.initialUsers.length)
    })
  })

  after(async () => {
    await mongoose.connection.close()
  })
})
