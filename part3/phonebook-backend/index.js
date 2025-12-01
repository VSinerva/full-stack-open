require('dotenv').config()
const express = require('express')
const morgan = require('morgan')

const Person = require('./models/person')

const app = express()

app.use(express.static('front'))
app.use(express.json())

morgan.token('body', (req, res) => JSON.stringify(req.body) )
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/', (request, response) => {
	response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
	Person.countDocuments().then(count => {
		response.send(`
			<p>Phonebook has info for ${count} people</p>
			<p>${new Date()}</p>
		`)
	})
})

app.get('/api/persons', (request, response) => {
	Person.find({}).then(persons => {
		response.json(persons)
	})
})

app.post('/api/persons', (request, response) => {
	const body = request.body

	if (!body.name)
		return response.status(400).json({error: 'name missing'})
	if (!body.number)
		return response.status(400).json({error: 'number missing'})

	const { name, number } = body
	const person = new Person({name, number})

	person.save().then(savedPerson => {
		response.json(savedPerson)
	})
})

app.put('/api/persons/:id', (request, response) => {
	const { name, number } = request.body

	if (!name)
		return response.status(400).json({error: 'name missing'})
	if (!number)
		return response.status(400).json({error: 'number missing'})

	Person.findById(request.params.id).then(person => {
		if (!person) {
			return response.status(404).end()
		}

		person.name = name  // Mostly reduntant right now
		person.number = number 

		return person.save().then(updatedPerson => {
			response.json(updatedPerson)
		})
	})
	.catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
	Person.findById(request.params.id).then(person => {
		if (person) {
			response.json(person)
		} else {
			response.status(404).end()
		}
	})
	.catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
	Person.findByIdAndDelete(request.params.id).then(result => {
		response.status(204).end()
	})
	.catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
	console.error(error.message)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	} 

	next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
