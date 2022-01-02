require('dotenv').config()



const path = require('path')
const express = require('express')
// const morgan = require('morgan')
var methodOverride = require('method-override')
const handlebars  = require('express-handlebars')

const route = require('./routers')
const db = require('./config/db')

// Connect to DB
db.connect(process.env.MONGODB_URI)

const app = express()
const port = process.env.PORT ||3000

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({
  "extended": true
})); // xử lý request gửi từ html
app.use(express.json())// xử lý request gửi từ js

app.use(methodOverride('_method'))
//HTTP logger
// app.use(morgan('combined'))


//template engine 
app.engine(
  'hbs',
  handlebars({
    extname: '.hbs',
    helpers: {
      sum : (a, b) => a + b,
      
  }
}))

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname,  'resources','views'));
// console.log(path.join(__dirname, 'resources/views'))

// Route init
route(app)

app.listen(port, () => {
  console.log(`Sever listen prort on ${port}`)
})