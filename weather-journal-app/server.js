// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to ruNn0. server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8080;
const server = app.listen(port, listening);
 function listening(){
    // console.log(server);
    console.log(`running on localhost: ${port}`);
  };
  
   // GET route
app.get('/allData', sendData);

function sendData (request, response) {
  response.send(projectData);
  console.log(projectData);
};

// POST route
app.post("/weather",addWeatherData)
  function addWeatherData(req,res){
    let newData = req.body;
    let newEntry = {
      temperature: newData.temperature,
      myDate: newData.TodayDate,
      feel: newData.feel
    }
    projectData = newEntry;
    res.send(projectData);
    console.log(projectData);
  }
