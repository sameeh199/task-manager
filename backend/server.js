const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors())

// Import routes
const taskRoutes = require('./routes/tasks')

// Use routes
app.use('/api/tasks', taskRoutes)


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected!'))
  .catch((err) => console.log('Connection failed:', err))

app.get('/', (req, res) => {
  res.send('Server is running!')
})

app.listen(5000, () => {
  console.log('Server started on port 5000')
})
