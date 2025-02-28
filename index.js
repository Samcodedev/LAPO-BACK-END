const express = require('express')
const  connectDB = require('./config/dbConnection')
const dotenv = require('dotenv').config()
const handleError = require('./middleware/errorHandling')
var cors = require('cors')
connectDB()

const app = express()
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "https://samuel-obanla-lapo.netlify.app",
    ],
  }))



app.use('/api/user', require('./router/userRouter'))
app.use('/api/card', require('./router/cardRouter'))
app.use('/api/scheme', require('./router/schemeRouter'))
app.use(handleError)


app.listen( process.env.PORT, ()=>{
    console.log(`server starts on port ${process.env.PORT} `);
})
