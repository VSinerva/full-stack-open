const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
	await Blog.deleteMany({})
	await Blog.insertMany(helper.initialBlogs)
})

test('all blogs are returned as json', async () => {
	const response = await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)

	assert.strictEqual(response.body.length, helper.initialBlogs.length)
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

test('a valid blog can be added', async () => {
	let newBlog = helper.newBlog

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const blogsAtEnd = await helper.blogsInDb()
	assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

	let blogInDb = blogsAtEnd.find(b => b.title === newBlog.title)
	delete blogInDb.id // This gets dynamically added by MongoDB, so can't be compared
	assert.deepStrictEqual(blogInDb, newBlog)
})

test('missing "likes" default to 0', async () => {
	let newBlog = helper.newBlog
	delete newBlog.likes

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const blogsAtEnd = await helper.blogsInDb()
	let blogInDb = blogsAtEnd.find(b => b.title === newBlog.title)
	assert.strictEqual(blogInDb.likes, 0)
})

test('missing "title" returns a 400 error', async () => {
	let newBlog = helper.newBlog
	delete newBlog.title

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(400)

	const blogsAtEnd = await helper.blogsInDb()
	assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

test('missing "url" returns a 400 error', async () => {
	let newBlog = helper.newBlog
	delete newBlog.url

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(400)

	const blogsAtEnd = await helper.blogsInDb()
	assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

after(async () => {
	await mongoose.connection.close()
})
