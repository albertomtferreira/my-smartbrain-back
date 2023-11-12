const express = require('express');
const bcrypt = require('bcrypt');
var cors = require('cors');
const saltRounds = 10;
const port = 3001;

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

const database = {
  users: [
    {
    id:"1",
    name:"John",
    email:"john@gmail.com",
    password:"12345",
    entries: 0,
    joined: new Date()
    },
    {
      id:"2",
      name:"Maria",
      email:"Maria@gmail.com",
      password:"54321",
      entries: 0,
      joined: new Date()
      }
  ],
  login:[
    {
      id: '987',
      hash: '',
      email:"john@gmail.com"
    }
  ]
}

//ROOT
app.get('/', (req,res)=>{
  res.json(database.users);
})

//SIGNIN
app.post('/signin', (req,res)=>{
  console.log(req.body.email);
  if (req.body.email === database.users[0].email && 
    req.body.password === database.users[0].password){
    res.json("success");
  }else{
    res.json('error logging again');
  }  
})

//REGISTER
app.post('/register', (req,res) =>{
  const {email,name,password}=req.body;
  database.users.push(
    {id:"5",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date()}
  )
  res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id',(req,res)=>{
  const {id} = req.params;
    let found = false;
  database.users.forEach(user => {
    if (user.id === id){
      found = true;
      return res.json(user);
    }
  })
  if (!found){
    res.status(400).json('invalid user ')
  }
})

app.post('/image', (req,res)=>{
  const {id} = req.body;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id){
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  })
  if (!found){
    res.status(400).json('invalid user')
  }
})

app.listen(port, ()=> {
  console.log('app is running on port ', port);
})
//BCRYPT NODE --> https://www.npmjs.com/package/bcrypt

// bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
//   // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
//   // result == true
// });
// bcrypt.compare(someOtherPlaintextPassword, hash, function(err, result) {
//   // result == false
// });

// BCRYPT NODE-JS --> DEPRECATED --> https://www.npmjs.com/package/bcrypt-nodejs
// bcrypt.hash("bacon", null, null, function(err, hash) {
//   // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//   // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//   // res = false
// });


