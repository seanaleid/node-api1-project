// implement your API here

// import express from "express";
const express = require('express'); // same as above

const db = require('./data/db.js');

const server = express();

// middleware
server.use(express.json()); // teaches express how to read JSON
// we need ^^^ for the POST and PUT to work

// handles GET requests to / on localhost:8000
// INITIAL GET REQUEST
server.get('/', (req, res) => {
    res.send("Hello from Sean's computer.")
})

// GET from /api/users
server.get('/api/users', (req, res) => {
    
    db.find()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json({ message: "The users information could not be retrieved."});
        })
    }
)

// GET from /api/user/:id
server.get(`/api/users/:id`, (req,res) => {
    // this is how we get the id, comes form the user in the form of a request with information (body)
    const id = req.params.id
    db.findById(id)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json({ error: "The user information could not be retrieved."});
        })
})

// handles POST requests to / on localhost:8000/api/users
server.post('/api/users', (req, res) =>{
    const userInfo = req.body;

    console.log('user information', userInfo);

    if(!userInfo.name || !userInfo.bio){
        res.status(400).json({
            errorMessage: "Please provide name and bio for the user."
        })
    } else {
    db.insert(userInfo)
        .then(user => {
            res.status(201).json({user});
        })
        .catch(err => {
            console.log('POST ERROR users', err);
            res.status(500).json({ error: "There was an error while saving the user to the database"});
        });
    }
});

// handles PUT requests to / on localhost:8000
server.put(`/api/users/:id`, (req, res) => {
    db.update(req.body.id, req.body)
        .then(changes => {
            if(changes === 0 ){
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            } else if(!!changes.body || !!changes.bio) {
                res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
            } else {
                res.status(200).json({ message:`${changes} records updated`})
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The user information could not be modified." })
        })
})


// handles DELETE requests to / on localhost:8000
server.delete(`/api/users/:id`, (req, res) => {
    db.remove(req.body.id, )
        .then(count => {
            if(count === 0){
                res.status(404).json({ message: "The user with the specified ID does not exist."})
            } else {
                console.log(`the user was deleted`, count)
                res.status(200).json({ message: `user with id deleted`, count })
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The user could not be removed"})
        })
})


// listen for requests in a particular post on localhost
const port = 8000; // localhost:8000
server.listen(port, () => console.log('\n=== API on port 8000 is running ===\n'));
