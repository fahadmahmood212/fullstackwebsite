import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const express = require('express')
import bodyParser from 'body-parser';
var MongoClient = require('mongodb').MongoClient;

const app = express()
const port = process.env.PORT || 3000

/*
app.use(function(req, res, next) {
  // allow different IP address
  res.header("Access-Control-Allow-Origin","*");
  // allow different header fields
  res.header("Access-Control-Allow-Headers","*");
  console.log("In comes a request to: " + request.url);
  response.end("HERE I AM!!");

  next();
  });
*/

// parses the json object included in the request body
app.use(bodyParser.json()); 

// endpoint to view all lessons
app.get('/lessons', async (req, res) => {
  const client = await MongoClient.connect(
    'mongodb+srv://fahadmahmood:030064Fm@cluster0.ykjk6.mongodb.net/vuedb?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  const db = client.db('vuedb');
  const lessons = await db.collection('lessons').find({}).toArray();  
  res.status(200).json(lessons);
  client.close();
});

// endpoint to view one orders
app.get('/user', async (req, res) => {
  const client = await MongoClient.connect(
    'mongodb+srv://fahadmahmood:030064Fm@cluster0.ykjk6.mongodb.net/vuedb?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  const db = client.db('vuedb');
  const user = await db.collection('orders').find({"id":0}).toArray();  
  res.status(200).json(user);
  client.close();
});

// endpoint to view all orders
app.get('/orders', async (req, res) => {
  const client = await MongoClient.connect(
    'mongodb+srv://fahadmahmood:030064Fm@cluster0.ykjk6.mongodb.net/vuedb?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  const db = client.db('vuedb');
  const orders = await db.collection('orders').find({}).toArray();  
  res.status(200).json(orders);
  client.close();
});

// endpoint for saving an order
app.post('/orders',async (req, res) => {
  // initiate DB connection
  const client = await MongoClient.connect(
    'mongodb+srv://fahadmahmood:030064Fm@cluster0.ykjk6.mongodb.net/vuedb?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }  );
  const db = client.db('vuedb');
  await db.collection('orders').insertOne({ 
   name: req.body.name,
   phoneNumber: req.body.phoneNumber,
   lessonId: req.body.lessonId,
   spaces: req.body.spaces,
  });
  res.status(200);
  client.close();
});

// endpoint for getting an order from a user
app.put('/lessons/update',async (req, res, next) => {
  // initiate DB connection
  const client = await MongoClient.connect(
    'mongodb+srv://fahadmahmood:030064Fm@cluster0.ykjk6.mongodb.net/vuedb?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }  );
  const db = client.db('vuedb');
  const lesson = await db.collection('lessons').updateOne(
  {id: req.body.id }, 
  {$set: req.body},
  (e, result) => {
    if (e) return next(e)
  res.send((result.result.n === 1) ? {msg: 'success'} : {msg: 'error'})
  });
  res.status(200).json(orders);
  client.close();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
