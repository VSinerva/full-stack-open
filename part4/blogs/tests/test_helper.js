const Blog = require('../models/blog')
const User = require('../models/user')

const newBlog = () => {
  return {
    title: 'Blog Title',
    author: 'Blog Author',
    url: 'http://localhost',
    likes: 100,
  }
}

const listWithOneBlog = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
  }
]

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  }
]

const nonExistingId = async () => {
  const blog = new Blog(newBlog())
  await blog.save()
  await blog.deleteOne()

  return blog.id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const newUser = () => {
  return {
    username: 'new',
    password: 'SuperSecretNewPassword',
    name: 'New Test User',
  }
}

const initialUsers = [
  {
    username: 'test',
    passwordHash: '$2b$10$did.cmEn7nLATuWVYX5DduxOGW1Fu0lDJmwrdIhisDYxRoaOY5f3q',
    name: 'Test User The First',
  },
  {
    username: 'checking',
    passwordHash: '$2b$10$EyZgOLwepZD1B9lIMgR4g.vZoNbAVrybUmsc3gyuIHGwDio82V/Le',
    name: 'Another Test User',
  },
  {
    username: 'verification',
    passwordHash: '$2b$10$QN7LFdTw60vVLcJQ6NOXgezLHiA1OdIvOTTPzQs5pKnTf8ts5vz4C',
    name: 'Test McTestface',
  },
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  newBlog,
  listWithOneBlog,
  initialBlogs,
  nonExistingId,
  blogsInDb,
  newUser,
  initialUsers,
  usersInDb
}
