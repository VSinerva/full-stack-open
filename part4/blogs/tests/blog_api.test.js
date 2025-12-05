const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

describe('blog API with existing blogs', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
    await Blog.deleteMany({})
    await Blog.insertMany(await helper.initialBlogs())
  })

  test('all blogs are returned as json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const initialBlogs = await helper.initialBlogs()
    assert.strictEqual(response.body.length, initialBlogs.length)
  })

  test('blog unique key is "id"', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogProperties = Object.keys(response.body[0])
    assert(blogProperties.includes('id'))
    assert(!blogProperties.includes('_id'))
  })

  describe('adding a new blog', () => {
    test('with valid data works', async () => {
      let newBlog = await helper.newBlog()

      const { token } = (await api
        .post('/api/login')
        .send({ username: 'test', password: 'tester' })
        .expect(200)).body

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('authorization', `Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const initialBlogs = await helper.initialBlogs()
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1)

      let blogInDb = blogsAtEnd.find(b => b.title === newBlog.title)
      delete blogInDb.id // This gets dynamically added by MongoDB, so can't be compared
      blogInDb.user = blogInDb.user.toString()
      newBlog.user = (await User.findOne({ username: helper.initialUsers[0].username })).id
      assert.deepStrictEqual(blogInDb, newBlog)
    })

    test('with missing likes default to 0', async () => {
      let newBlog = await helper.newBlog()
      delete newBlog.likes

      const { token } = (await api
        .post('/api/login')
        .send({ username: 'test', password: 'tester' })
        .expect(200)).body

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('authorization', `Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      let blogInDb = blogsAtEnd.find(b => b.title === newBlog.title)
      assert.strictEqual(blogInDb.likes, 0)
    })

    test('with a missing title returns a 400 error', async () => {
      let newBlog = await helper.newBlog()
      delete newBlog.title

      const { token } = (await api
        .post('/api/login')
        .send({ username: 'test', password: 'tester' })
        .expect(200)).body

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('authorization', `Bearer ${token}`)
        .expect(400)

      const initialBlogs = await helper.initialBlogs()
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, initialBlogs.length)
    })

    test('with a missing url returns a 400 error', async () => {
      let newBlog = await helper.newBlog()
      delete newBlog.url

      const { token } = (await api
        .post('/api/login')
        .send({ username: 'test', password: 'tester' })
        .expect(200)).body

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('authorization', `Bearer ${token}`)
        .expect(400)

      const initialBlogs = await helper.initialBlogs()
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, initialBlogs.length)
    })

    test('without a token returns a 401 error', async () => {
      const newBlog = await helper.newBlog()

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)

      const initialBlogs = await helper.initialBlogs()
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, initialBlogs.length)
    })
  })

  describe('deleting a blog', () => {
    test('with a valid id works', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      const { token } = (await api
        .post('/api/login')
        .send({ username: 'test', password: 'tester' })
        .expect(200)).body

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('authorization', `Bearer ${token}`)
        .expect(204)

      const initialBlogs = await helper.initialBlogs()
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, initialBlogs.length - 1)

      const titles = blogsAtEnd.map(b => b.title)
      assert(!titles.includes(blogToDelete.title))
    })

    test('with a missing id causes no error', async () => {
      const missingId = await helper.nonExistingId()

      const { token } = (await api
        .post('/api/login')
        .send({ username: 'test', password: 'tester' })
        .expect(200)).body

      await api
        .delete(`/api/blogs/${missingId}`)
        .set('authorization', `Bearer ${token}`)
        .expect(204)

      const initialBlogs = await helper.initialBlogs()
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, initialBlogs.length)
    })

    test('with the wrong token returns a 401 error', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[1]

      const { token } = (await api
        .post('/api/login')
        .send({ username: 'test', password: 'tester' })
        .expect(200)).body

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('authorization', `Bearer ${token}`)
        .expect(401)

      const initialBlogs = await helper.initialBlogs()
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, initialBlogs.length)
    })

    test('without a token returns a 401 error', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(401)

      const initialBlogs = await helper.initialBlogs()
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, initialBlogs.length)
    })
  })

  describe('updating a blog', () => {
    test('with valid data works', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      blogToUpdate.likes += 10

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)

      const initialBlogs = await helper.initialBlogs()
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, initialBlogs.length)

      const blogInDb = blogsAtEnd.find(b => b.id === blogToUpdate.id)
      assert.deepStrictEqual(blogInDb, blogToUpdate)
    })

    test('with a missing id causes a 404 error', async () => {
      const missingId = await helper.nonExistingId()

      await api
        .put(`/api/blogs/${missingId}`)
        .expect(404)
    })
  })

  after(async () => {
    await mongoose.connection.close()
  })
})
