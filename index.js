const express = require('express');
const moment = require('moment');
const bodyParser = require('body-parser');

/* --- helper functions -- */
const AFTERNOON_DEADLINE = require('./constants.js').AFTERNOON_DEADLINE;
const NIGHT_DEADLINE = require('./constants.js').NIGHT_DEADLINE;
const getCurrentTimeISO = require('./helperFunctions.js').getCurrentTimeISO;
const createKey = require('./helperFunctions.js').createKey;
const validateRequest = require('./helperFunctions.js').validateRequest;

const app = express();
const port = 3000;

/* - Middlewares - */
app.use(bodyParser.urlencoded({ extended: false })) //parse application/x-www-form-urlencoded
app.use(bodyParser.json())


app.get('/', (req, res) => {
  res.send('SCOOP SCOOP scoopy diving!');
});

let requests = {}; // global requests, ideally we want to save it in the database;

// Purpose: to create a new request;
app.post('/trips/requests', (req, res) => {
   let {startTime, mode} = req.body;
   let validation = validateRequest(startTime, mode);
   if(validation.error){
     return res.status(406).send(validation);
   }

  let requestId = createKey(startTime); // creating a random id;
  let request = {startTime, mode, requestId};
  requests[requestId] = request;
  return res.send(request);
});

// Purpose: to fetch all requests
app.get('/trips/requests', (req, res) => {
  let request_response = Object.entries(requests).map(([key, value]) => value);
  return res.send(request_response);
});

// Purpose: to update a request
app.put('/trips/requests/:requestId', (req, res) => {
  let {requestId} = req.params;
  if(!requestId){
    return res.status(406).send({error:true, message:'invalid request id'});
  }
  let {startTime, mode} = req.body;
  let request = {
    startTime,
    mode,
    requestId
  }
  let validation = validateRequest(startTime, mode);
  if(validation.error){
    return res.status(406).send(validation);
  }
  if(!requests[requestId]){
    return res.send({error:true, message:'Invalid request id'});
  }

  requests[requestId] =  request;

  return res.send(request);
});

// Purpose: to delete a request given a requestId
app.delete('/trips/requests/:requestId', (req, res) => {
  let {requestId} = req.params;
  if(!requestId){
    return res.status(406).send({error:true, message:'invalid request id'});
  }
  delete requests[requestId];
  return res.send({});
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`))
