const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

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

test('dummy returns one', () => {
  const result = listHelper.dummy([])
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('of an empty list equals 0', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })

  test('of a single blog list equals the likes of that', () => {
    const result = listHelper.totalLikes(helper.listWithOneBlog)
    assert.strictEqual(result, 5)
  })


  test('of multiple blogs equals the sum of likes', () => {
    const result = listHelper.totalLikes(initialBlogs)
    assert.strictEqual(result, 36)
  })
})

describe('favourite blog', () => {
  test('in an empty list is undefined', () => {
    const result = listHelper.favouriteBlog([])
    assert.deepStrictEqual(result, undefined)
  })

  test('in a single blog list equals the blog', () => {
    const result = listHelper.favouriteBlog(helper.listWithOneBlog)
    assert.deepStrictEqual(result, helper.listWithOneBlog[0])
  })

  test('of multiple blogs equals the one with most likes', () => {
    const result = listHelper.favouriteBlog(initialBlogs)
    assert.deepStrictEqual(result, initialBlogs[2])
  })
})

describe('most blogs', () => {
  test('in an empty list is undefined', () => {
    const result = listHelper.mostBlogs([])
    assert.deepStrictEqual(result, undefined)
  })

  test('in a single blog list equals the author of that blog', () => {
    const result = listHelper.mostBlogs(helper.listWithOneBlog)
    const correct = {
      author: 'Edsger W. Dijkstra',
      blogs: 1
    }
    assert.deepStrictEqual(result, correct)
  })

  test('of multiple blogs equals the one with most blogs', () => {
    const result = listHelper.mostBlogs(initialBlogs)
    const correct = {
      author: 'Robert C. Martin',
      blogs: 3
    }
    assert.deepStrictEqual(result, correct)
  })
})

describe('most likes', () => {
  test('in an empty list is undefined', () => {
    const result = listHelper.mostLikes([])
    assert.deepStrictEqual(result, undefined)
  })

  test('in a single blog list equals the author of that blog', () => {
    const result = listHelper.mostLikes(helper.listWithOneBlog)
    const correct = {
      author: 'Edsger W. Dijkstra',
      likes: 5
    }
    assert.deepStrictEqual(result, correct)
  })

  test('of multiple blogs equals the one with most likes', () => {
    const result = listHelper.mostLikes(initialBlogs)
    const correct = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }
    assert.deepStrictEqual(result, correct)
  })
})
