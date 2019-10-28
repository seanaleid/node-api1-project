// implement your API here

// import express from "express";
const express = require('express'); // same as above

const db = require('./data/db.js');

const server = express();

// middleware
server.use(express.json()); // teaches express how to read JSON
// we need ^^^ for the POST and PUT to work

// handles GET requests to / on localhost:8000
server.get('/', (req, res) => {
    res.send("Hello from Sean's computer.")
})

// handles POST requests to / on localhost:8000


// handles PUT requests to / on localhost:8000


// handles DELETE requests to / on localhost:8000


// listen for requests in a particular post on localhost
const port = 8000; // localhost:8000
server.listen(port, () => console.log('\n=== API on port 8000 is running ===\n'));
