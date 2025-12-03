const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => blogs.reduce((sum, val) => sum+val.likes, 0)

const favouriteBlog = (blogs) => {
	const favourite = blogs.reduce((current, next) => current.likes >= next.likes ? current : next, {})
	return (favourite._id ? favourite : undefined)
}

module.exports = {
	dummy,
	totalLikes,
	favouriteBlog
}
