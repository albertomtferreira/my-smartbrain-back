const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const saltRounds = 10;
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : '290811',
    database : 'smart-brain'
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
  console.log(`app is running on port ${process.env.PORT}`);
})