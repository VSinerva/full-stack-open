const Blog = require('../models/blog')
const User = require('../models/user')

const newUser = () => {
  return {
    username: 'new',
    password: 'SuperSecretNewPassword',
    name: 'New Test User',
    blogs: [],
  }
}

const initialUsers = [
  {
    username: 'test',
    passwordHash: '$2a$10$jO2Ze9BV.Sm842s60CpezuaMQPXSym.M6VG34sj52Vg9PAsoLsnci', // 'tester'
    name: 'Test User The First',
    blogs: [],
  },
  {
    username: 'checking',
    passwordHash: '$2a$10$D8nAgoVpzCEiORMpFdM57e6i9R5OtE4YLlkRFFDJJVj5YUptW3boi', // 'checked'
    name: 'Another Test User',
    blogs: [],
  },
  {
    username: 'verification',
    passwordHash: '$2a$10$mAsBu7ynx.7BYneYhcjvpO3OP/strI.Q6tJ5xR/.vhyKXiKXMkiOe', // 'verified'
    name: 'Test McTestface',
    blogs: [],
  },
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const newBlog = async () => {
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

const initialBlogs = async () => {
  const user1 = await User.findOne({ username: initialUsers[0].username })
  const user2 = await User.findOne({ username: initialUsers[1].username })

  return [
    {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      user: user1,
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      user: user2,
    },
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      user: user1,
    },
    {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
      user: user2,
    },
    {
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
      user: user2,
    },
    {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      user: user2,
    }
  ]
}

const nonExistingId = async () => {
  const blog = new Blog(await newBlog())
  await blog.save()
  await blog.deleteOne()

  return blog.id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
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
