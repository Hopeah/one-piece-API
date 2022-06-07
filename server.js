//Import and assign express module to a variable
const { response } = require('express')
const express = require('express')
const app = express()
//Create a default port for the server to run on
const PORT = 8000

//Express json-parser to get access to data that is sent in (from post requests) easily
app.use(express.json())

//Make an object filled with data
//Is it better to create an array of objects, or an object containing objects?
let characters = {
    'luffy': {
        'hairColor': 'Black',
        'occupation': 'Pirate',
        'speciality': 'Stretching'
    },
    'roronoa zoro': {
        'hairColor': 'Green',
        'occupation': 'Former bounty hunter turned pirate',
        'speciality': 'Triple sword-wielder'
    },
    'nami': {
        'hairColor': 'Red',
        'occupation': 'Thief turned pirate',
        'speciality': 'Deception'
    }
}

//One of the routes to the application, defines an event handler that is used to handle GET request made to the '/' root
app.get('/', (req, res) => {
    res.send(__dirname + "/index.html")
})

//Another event handler that handles HTTP GET requests to the '/api/characters' root
//The below code is for fetching a single resouce of characters as specified by the name
//Read requests
app.get('/api/characters/:name', (req, res) => {
    const name = req.params.name.toLowerCase()
    //find is an array method, could be used if the characters object was an array instead with a name parameter
    // const character = characters.find(character => character.name === name)
    if (characters[name]) {
        res.json(characters[name])
    } else {
        res.status(404).end()
    }
})

//Create request
app.post('/api/characters', (req, res) => {
    //body is identified with the help of json-parser
    const character = req.body
    console.log(character)
    response.json(character)
})

//Deleting data
app.delete('/api/characters/:name', (req, res) => {
    const name = req.params.name
    characters = characters.filter(character => character.name !== name) 

    res.status(204).end()
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})