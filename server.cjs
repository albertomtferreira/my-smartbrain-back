const express = require('express');
const port = 3000;

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

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
  ]
}

//ROOT
app.get('/', (req,res)=>{
  res.json(database.users);
})

//SIGNIN
app.post('/signin', (req,res)=>{
  if (req.body.email === database.users[0].email && req.body.password === database.users[0].password){
    res.json("well Done");
  }else{
    res.status(400).json('error logging in')
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