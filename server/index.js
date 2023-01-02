const express = require('express')
const mongoose = require('mongoose')
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')
const authRoute = require('./Route/authRoute')
const formRoute = require('./Route/formRoute')
dotenv.config()

app.use(cors())
app.use(express.json())

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 8000
mongoose.set("debug", true);
mongoose.set("strictQuery", false);
mongoose.connection.once('open', () => console.log('connected successfully'))
mongoose.connection.on('error', (err) => console.log(err))

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  // useFindAndModify: false,
  useUnifiedTopology: true,
  // useCreateIndex: true,
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/' ,authRoute);
app.use('/', formRoute);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`)
})