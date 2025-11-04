const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let db;

MongoClient.connect(process.env.MONGO_URI)
  .then(client => {
    db = client.db('myappdb');
    console.log('Connected to MongoDB');
  })
  .catch(error => console.error(error));

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.get('/items', async (req, res) => {
  try {
    const items = await db.collection('items').find().toArray();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/items', async (req, res) => {
  try {
    const result = await db.collection('items').insertOne(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});