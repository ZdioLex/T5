const express = require('express');
const app  = express();

let users = [
    { email: "abc@abc.ca", firstName: "ABC", id: "5abf6783" },
    { email: "xyz@xyz.ca", firstName: "XYZ", id: "5abf674563" }
  ];

app.use(express.json()); 


app.get('/users', (req, res) => {
    res.status(200).send({
      message: "Users retrieved",
      success: true,
      users
    });
  });
  

  app.put('/update/:id', (req, res) => {
    const id = req.params.id; 
    const updatedInfo = req.body; 
    const index = users.findIndex(user => user.id == id); 
    if(index >= 0) {
      users[index] = {...users[index], ...updatedInfo}; 
      res.status(200).send({
        message: "User updated",
        success: true
      });
    } else {
      res.status(404).send({
        message: "The user does not exist",
        success: false
      });
    }
  });

  app.post('/add', (req, res) => {
    const newUser = req.body; 
    newUser.id = users.length;
    users.push(newUser); 
    res.status(201).send({
      message: "User added",
      success: true,
    });
  });
  

  app.get('/user/:id', (req, res) => {
    const id = req.params.id; 
    const user = users.find(user => user.id == id);
    if (user) {
      res.status(200).send({
        success: true,
        user
      });
    } else {
      res.status(404).send({
        success: false,
        message: "The user does not exist"
      });
    }
  });
  
module.exports = app;