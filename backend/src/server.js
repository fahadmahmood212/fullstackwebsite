const express = require('express')
import bodyParser from 'body-parser';

const products = [{
  id: '123',
  name: 'Running Shoes',
  price: '60.00',
  imageUrl: '/images/shoes-1.jpg',
  averageRating: '5.0',
}, {
  id: '234',
  name: 'Basketball Shoes',
  price: '120.00',
  imageUrl: '/images/shoes-2.jpg',
  averageRating: '5.0',
}, {
  id: '345',
  name: 'Bright Red Shoes',
  price: '90.00',
  imageUrl: '/images/shoes-3.jpg',
  averageRating: '5.0',
}, {
  id: '456',
  name: 'Fancy Shoes',
  price: '190.00',
  imageUrl: '/images/shoes-4.jpg',
  averageRating: '5.0',
}, {
  id: '567',
  name: 'Skateboard Shoes',
  price: '75.00',
  imageUrl: '/images/shoes-5.jpg',
  averageRating: '5.0',
}];

//these are the products in the cart
export let cartItems = [
  products[0],
  products[2],
  products[3],
];


const app = express()
const port = 3000
// parses the json object included in the request body
app.use(bodyParser.json()); 

// endpoint to view all products
app.get('/api/products', (req, res) => {
  res.status(200).json(products);
});

// endpoint to show items in cart
app.get('/api/users/:userId/cart', (req, res) => {
  res.status(200).json(cartItems);
});

//Endpoint to show specific item 'to get'
app.get('/api/products/:productId', (req, res) => {
  const { productId } = req.params;
  // find product whose id matches the productId from the URL parameter
  const product = products.find((product) => product.id === productId);
  // check if there was a match (and if there's anything to return)
  if (product) {
      res.status(200).json(product);
  } else {
      res.status(404).json('Could not find the product!');
  }
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

//this is endpoint of get request
app.get('/hello', (req, res) => {
    res.send('Fahad!');
});

// add a post request that will give info
app.get('/hello/:name', (req, res) => {
  res.send(`Hello ${req.params.name}!`);
});

//creating post request endpoint
app.post('/hello', (req, res) => {
    res.send(`Hello ${req.body.name}`);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});