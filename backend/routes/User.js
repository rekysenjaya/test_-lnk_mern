var express = require('express');
var router = express.Router();
const User = require('../models/User')
const Timestamp = require('../models/Timestamp')
const { Response, isTokenValid, secretKey } = require('../helpers/util')
const jwt = require('jsonwebtoken');

router.get('/', async function (req, res, next) {
  try {
    const user = await User.find()
    res.json(new Response(user))
  } catch (e) {
    console.log(e)
    res.send(e)
  }
});

router.post('/', async function (req, res, next) {
  try {
    const { username, password, name } = req.body

    const user = await User.create({ username, password, name });
    res.status(201).json(new Response(user))
  } catch (e) {
    console.log(e)
    res.send(e)
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    res.status(200).json(new Response(user))
  } catch (e) {
    console.log(e)
    res.send(e)
  }
});

router.get('/profile', async function (req, res, next) {
  const token = req.headers.authorization;

  if (token && token.split(' ')[1]) {
    const pureToken = token.split(' ')[1]

    try {
      const result = jwt.verify(pureToken, secretKey)
      const user = await User.findById(result.userid)

      res.json(new Response({ name: user.name }))
    } catch (e) {
      res.json(new Response({ message: 'token invalid' }, false))
    }
  } else {
    res.json(new Response({ message: 'token invalid' }, false))
  }
});

router.get('/timestamp', async function (req, res, next) {
  try {
    const timestamp = await Timestamp.find()
    res.json(new Response(timestamp))
  } catch (e) {
    console.log(e)
    res.send(e)
  }
});

router.get('/timestamp-user', async function (req, res, next) {
  try {
    const timestamp = await Timestamp.find().populate('executor','username name')
    res.json(new Response(timestamp))
  } catch (e) {
    console.log(e)
    res.send(e)
  }
});

router.post('/signin', async function (req, res, next) {
  try {
    const { username, password } = req.body

    const user = await User.findOne({ username })
    if (!user.comparePassword(password)) {
      return res.json(new Response({ message: "password doesn't match" }, false))
    }

    // create timestamp
    const timestamp = await Timestamp.create({ login: Date.now(), executor: user._id });

    // create token
    user.token = jwt.sign({ userid: user._id, username: user.username }, secretKey);
    await user.save()

    res.json(new Response({
      username: user.username,
      name: user.name,
      token: user.token,
      idTimestamp: timestamp._id
    }))
  } catch (e) {
    console.log('gagal tambah user', e)
    res.status(500).json(new Response(e, false))
  }
});

router.put('/signout/:id', async function (req, res, next) {
  const token = req.headers.authorization;

  if (token && token.split(' ')[1]) {
    const pureToken = token.split(' ')[1]

    try {
      const result = jwt.verify(pureToken, secretKey)
      const user = await User.findById(result.userid)
      await Timestamp.findByIdAndUpdate({ _id: req.params.id }, { logout: Date.now() })
      user.token = null
      await user.save()
      res.json(new Response({ message: "signout success" }, true))
    } catch (e) {
      res.json(new Response({ message: 'token invalid' }, false))
    }
  } else {
    res.json(new Response({ message: 'token invalid' }, false))
  }
});

module.exports = router;