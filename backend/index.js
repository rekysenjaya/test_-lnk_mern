const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')
const app = express()
const port = 3002

mongoose.set('strictQuery', true)

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test_lnk_db');
}

main().catch(err => console.log(err));

var usersRouter = require('./routes/User');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.use('/users', usersRouter);

module.exports = app;