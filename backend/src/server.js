const express = require('express')
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

const app = express()
const port = 3000

// parses the json object included in the request body
app.use(bodyParser.json()); 

// endpoint to view all lessons
app.get('/api/lessons', async (req, res) => {
  const client = await MongoClient.connect(
    'mongodb://127.0.0.1:27017',
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  const db = client.db('vuedb');
  const lessons = await db.collection('lessons').find({}).toArray();  
  res.status(200).json(lessons);
  client.close();
});

// endpoint to view all orders
app.get('/api/orders', async (req, res) => {
  const client = await MongoClient.connect(
    'mongodb://127.0.0.1:27017',
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  const db = client.db('vuedb');
  const orders = await db.collection('orders').find({}).toArray();  
  res.status(200).json(orders);
  client.close();
});

// endpoint for saving an order
app.post('/api/orders',async (req, res) => {
  // initiate DB connection
  const client = await MongoClient.connect(
    'mongodb://127.0.0.1:27017/',
    { useNewUrlParser: true, useUnifiedTopology: true }  );
  const db = client.db('vuedb');
  await db.collection('orders').insertOne({ 
   id: req.body.id,
   name: req.body.name,
   phoneNumber: req.body.phoneNumber,
   lessonId: req.body.lessonId,
   spaces: req.body.spaces,
  });
  const order = await db.collection('orders').findOne({ id: req.body.id });
  res.status(200).json(order);
  client.close();
});

// endpoint for getting an order from a user
app.post('/api/orders/user',async (req, res) => {
  // initiate DB connection
  const client = await MongoClient.connect(
    'mongodb://127.0.0.1:27017/',
    { useNewUrlParser: true, useUnifiedTopology: true }  );
  const db = client.db('vuedb');
  const orders = await db.collection('orders').find({ name: req.body.name, phoneNumber: req.body.phoneNumber }).toArray();
  if (orders.length==0) {
    res.status(404).json('Could not find client details!');
}
  res.status(200).json(orders);
  client.close();
});

// endpoint for adding items to users cart 'post'
app.post('/api/users/:userId/cart', (req, res) => {
  // pulling this out of request body { productId: '123'}
  const { productId }= req.body;
  const product = products.find( product => product.id === productId);
  if (product) {
      cartItems.push(product);
      res.status(200).json(cartItems);
  } else {
      res.status(404).json('Could not find product!');
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});