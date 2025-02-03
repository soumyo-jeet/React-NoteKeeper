const connectToMongo = require('./db.js');
const express = require('express');
const cors = require('cors');

connectToMongo();
const app = express();
app.use(cors())
const port = 5000;

// To parse req data and formating into json to store in req.body
app.use(express.json())

// Available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})