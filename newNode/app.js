const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
var app = express();
app.use(bodyParser.json());

var {Auth} = require('./models/login');

app.post('/signup',(req,res)=>{
      var userLogin = new Auth({
            username:req.body.username,
            password:req.body.password
      });
      userLogin.save().then((userLogin)=>{
           res.send(userLogin);
      },(err)=>{
         console.log(err.errmsg);
         res.send(err.errmsg)
      });
});

app.post('/login',(req,res)=>{
        //console.log(req.body);
         Auth.loginUser({
            username:req.body.username,
            password:req.body.password
         }).then(doc=>{
               res.send(doc);
         },(err)=>{
               res.send(err);
         });
});


app.post('/updateProfile',(req,res)=>{
        return Auth.updateProfile(req.body.username,req.body.password);
});


app.listen(3000,(done,err)=>{
      console.log('connected on :3000');
});
