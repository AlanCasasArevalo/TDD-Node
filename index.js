const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const { users } = require('./endpoint')
const { posts } = require('./endpoint')
const { authenticate }  = require('./middlewares')
const service  = require('./service')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const port = 3000

const usersHandlers = users(service)

app.get('/', usersHandlers.getUsers)
app.post('/', usersHandlers.postUsers)
app.put('/:id', usersHandlers.putUsers)
app.delete('/:id', usersHandlers.deleteUsers)

const postsHandlers = posts({ axios })

app.post('/posts',
    authenticate,
    postsHandlers.post
)

app.listen(port, () => {
    console.log(`Aplicacion corriendo en el puerto ${port}`)
})

module.exports = app