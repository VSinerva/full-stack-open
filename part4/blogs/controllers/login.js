const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const config = require('../utils/config')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    // This useless hash comparison is done to avoid leaking the existence of a username via a trivial timing attack
    // Without it, the timing difference between login attempts with a valid and invalid username is tens of milliseconds
    ? (await bcrypt.compare(password, '$2a$10$o6Uzj8YCr6xq2mqt4p943uX/81ZqSHbxpqVLa0GIyi/C/0IqYq0I6')) && false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, config.SECRET)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
