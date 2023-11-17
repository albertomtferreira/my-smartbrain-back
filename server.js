const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const saltRounds = 10;
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const { Client } = require('pg');


const db = knex({
  
  client: 'pg',
  connection: {
    connectionString:process.env.DATABASE_URL,
    ssl:{rejectUnauthorized:false},
    host: process.env.DATABASE_HOST,
    port: 5432,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PW,
    database: process.env.DATABASE_DB
  }
});

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

//ROOT
app.get('/', (req,res)=>{res.send('WORKSSSS!!!')})
//SIGNIN
app.post('/signin', (req,res) => {signin.handleSignin(req,res,db,bcrypt)})
//REGISTER
app.post('/register', (req,res) => {register.handleRegister(req,res,db,bcrypt,saltRounds)})
//PROFILE
app.get('/profile/:id', (req,res) => {profile.handleProfileGet(req,res,db)})
//IMAGE
app.put('/image', (req,res) => {image.handleImage(req,res,db)})
//IMAGE-API
app.post('/imageurl', (req,res) => {image.handleApiCall(req,res)})

app.listen(process.env.PORT || 3500, ()=> {
  console.log(`app is running on  port ${process.env.PORT}`);
})

// app.listen(process.env.PORT);