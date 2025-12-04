const dummy = () => {
  return 1
}

const totalLikes = (blogs) => blogs.reduce((sum, val) => sum+val.likes, 0)

const favouriteBlog = (blogs) => {
  const favourite = blogs.reduce((current, next) => current.likes >= next.likes ? current : next, {})
  return favourite.title ? favourite : undefined
}

const mostBlogs = (blogs) => {
  const blogCounts = blogs.reduce((values, blog) => {
    const author = blog.author
    let newValues = { ...values }

    if (!newValues[author])
      newValues[author] = 0

    newValues[author] += 1
    return newValues
  }, {})
  const authorWithMostBlogs = Object.entries(blogCounts).reduce((current, next) => {
    const nextObj = {
      author: next[0],
      blogs: next[1]
    }
    return current.blogs >= nextObj.blogs ? current : nextObj
  }, {})
  return authorWithMostBlogs.author ? authorWithMostBlogs : undefined
}

const mostLikes = (blogs) => {
  const likes = blogs.reduce((values, blog) => {
    const author = blog.author
    let newValues = { ...values }

    if (!newValues[author])
      newValues[author] = 0

    newValues[author] += blog.likes
    return newValues
  }, {})
  const authorWithMostLikes = Object.entries(likes).reduce((current, next) => {
    const nextObj = {
      author: next[0],
      likes: next[1]
    }
    return current.likes >= nextObj.likes ? current : nextObj
  }, {})
  return authorWithMostLikes.author ? authorWithMostLikes : undefined
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}
