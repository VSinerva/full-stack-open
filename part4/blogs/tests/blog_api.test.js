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

test('blog unique key is "id" ', async () => {
	const response = await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)

	const blogProperties = Object.keys(response.body[0])
	assert(blogProperties.includes('id'))
	assert(!blogProperties.includes('_id'))
})

after(async () => {
	await mongoose.connection.close()
})
