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

//* ANSWERS ROUTES *//
app.get('/questions/:id/answers', async (req, res) => {
  try {
    const con = await client.connect();
    const { id } = req.params;
    const data = await con
      .db(DB)
      .collection('answers')
      .find({
        questionId: new ObjectId(id),
      })
      .toArray();
    await con.close();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/questions/:id/answers', async (req, res) => {
  try {
    const con = await client.connect();
    const { id } = req.params;
    const answer = await con
      .db(DB)
      .collection('answers')
      .insertOne({
        answerBody: req.body.answerBody.trim(),
        createdAt: new Date(),
        updatedAt: null,
        like: 0,
        dislike: 0,
        questionId: new ObjectId(id),
      });
    res.status(200).json(answer);
    await con.close();
  } catch (err) {
    res.status(500).send(err);
  }
});

app.patch('/answers/:id', async (req, res) => {
  try {
    const con = await client.connect();
    const { id } = req.params;
    const data = await con
      .db(DB)
      .collection('answers')
      .updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            answerBody: req.body.answerBody.trim(),
            updatedAt: new Date(),
            like: req.body.like,
            dislike: req.body.dislike,
          },
        },
      );
    await con.close();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/answers/:id', async (req, res) => {
  try {
    const con = await client.connect();
    const { id } = req.params;
    const data = await con
      .db(DB)
      .collection('answers')
      .findOne({ _id: new ObjectId(id) });
    await con.close();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete('/answers/:id', async (req, res) => {
  try {
    const con = await client.connect();
    const { id } = req.params;
    const data = await con
      .db(DB)
      .collection('answers')
      .deleteOne({ _id: new ObjectId(id) });
    await con.close();
    res.status(200).json({ message: 'successfully deleted...' });
  } catch (err) {
    res.status(500).send(err);
  }
});

//* QUESTIONS ROUTES *//
app.post('/questions', async (req, res) => {
  try {
    const con = await client.connect();
    const question = {
      questionBody: req.body.questionBody.trim(),
      createdAt: new Date(),
      updatedAt: null,
      answers: [],
    };
    const data = await con.db(DB).collection('questions').insertOne(question);
    res.status(200).json(data);
    await con.close();
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/questions', async (req, res) => {
  try {
    const { sort } = req.query;
    const con = await client.connect();

    let pipeline = [
      {
        $lookup: {
          from: 'answers',
          localField: '_id',
          foreignField: 'questionId',
          as: 'answers',
        },
      },
      {
        $addFields: {
          answerCount: { $size: '$answers' },
        },
      },
      {
        $sort: { createdAt: sort == 'asc' ? 1 : -1 },
      },
    ];

    const data = await con
      .db(DB)
      .collection('questions')
      .aggregate(pipeline)
      .toArray();
    await con.close();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/questions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db(DB)
      .collection('questions')
      .aggregate([
        {
          $match: {
            _id: new ObjectId(id),
          },
        },
        {
          $lookup: {
            from: 'answers',
            localField: '_id',
            foreignField: 'questionId',
            as: 'answers',
          },
        },
        { $limit: 1 },
      ])
      .toArray();
    await con.close();
    res.status(200).json(data[0]);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.patch('/questions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db(DB)
      .collection('questions')
      .updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            questionBody: req.body.questionBody.trim(),
            updatedAt: new Date(),
          },
        },
      );
    await con.close();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete('/questions/:id', async (req, res) => {
  try {
    const con = await client.connect();
    const { id } = req.params;
    const data = await con
      .db(DB)
      .collection('questions')
      .deleteOne({ _id: new ObjectId(id) });
    await con.close();
    res.status(200).json({ message: 'successfully deleted...' });
  } catch (err) {
    res.status(500).send(err);
  }
});

//* USERS ROUTES *//
app.post('/auth/register', async (req, res) => {
  try {
    console.log('Req body in register ', req.body);
    const con = await client.connect();
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      avatar: req.body.avatar,
    };
    const data = await con.db(DB).collection('users').insertOne(user);
    res.status(200).json(data);
    await con.close();
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/auth/login', async (req, res) => {
  try {
    const con = await client.connect();
    const user = await con
      .db(DB)
      .collection('users')
      .findOne({ email: req.body.email });
    if (user && user.password === req.body.password) {
      res.status(200).json({
        message: `Successfully connected!`,
        approved: true,
        user,
      });
    } else {
      res.json({ message: 'Bad credentials!', approved: false });
    }
    await con.close();
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/users', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db(DB).collection('users').find().toArray();
    await con.close();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con.db(DB).collection('users').findOne(new ObjectId(id));
    await con.close();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server started at port ${port}...`));
