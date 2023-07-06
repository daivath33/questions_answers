const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
app.use(express.json());
app.use(cors());

const URL = process.env.DATABASE;
const DB = process.env.DATABASE_NAME;
const client = new MongoClient(URL);

client
  .connect()
  .then(() => {
    console.log('Connected Successfully to MongoDB!');
    client.close();
  })
  .catch((error) => console.log('No connection...', error));

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server started at port ${port}...`));
