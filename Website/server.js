const express = require('express')
const logger = require('morgan')
const path = require('path')
const server = express()
server.use(express.urlencoded({'extended': true}))
server.use(logger('dev'))

// Routes
server.get('/do_a_random', (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`)
})

// Serve the HTML form
server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle form submission
server.post('/', (req, res) => {
  const { noun, verb, adjective, adverb, place } = req.body;

  // Create a simple mad lib
  const madLib = `Once upon a time, there was a ${adjective} ${noun} who loved to ${verb} ${adverb} in ${place}.`;

  // Send the filled mad lib as the response
  res.send(`<h2>Your Mad Lib:</h2><p>${madLib}</p>`);
});

// Setup static page serving for all the pages in "public"
const publicServedFilesPath = path.join(__dirname, 'public')
server.use(express.static(publicServedFilesPath))


// The server uses port 80 by default unless you start it with the extra
// command line argument 'local' like this:
//       node server.js local
let port = 80
if (process.argv[2] === 'local') {
  port = 8080
}

server.listen(port, () => console.log('Ready on localhost!'))
