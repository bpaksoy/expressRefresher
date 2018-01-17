const env = process.env.NODE_ENV || "development";
const config = require('./knexfile.js')[env];
const knex = require('knex')(config);
const express = require('express');
const port = process.env.PORT || 8000;
const app = express();
const bodyParser= require("body-parser");
const bcrypt = require("bcrypt-as-promised");

const ejs = require("ejs");
app.set("view engine", "ejs")

app.use( express.static( "public" ));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.get("/users/:id", function(req, res, next){
   const id = req.params.id;
   knex("allusers")
    .where("id", id)
    .first()
    .then(function(user){
         console.log("user", user);
         res.render("user", {user});
   }).catch(function(err){
     console.log(err);
   });
});

app.get("/sign_up", function(req,res, next){
 res.render("signup");
});

app.get("/sign_in", function(req, res, next){
  res.render("signin");
});

app.post("/sign_in", function(req, res, next){
 const {username, password} = req.body;
  knex("allusers")
  .where("username", username)
  .first()
  .then(function(user){
      bcrypt.compare(password, user.hashed_password)
      .then(function(){
        knex("allusers")
        .then(function(){
          res.redirect("/users/" + user.id);
        })
      }).catch(function(err){
        res.sendStatus(404);
      })
   })
  .catch(function(err){
    res.sendStatus(404);
  });

});

app.post("/sign_up", function(req,res, next){
  const { username, password } = req.body;
  bcrypt.hash(req.body.password, 12)
  .then(function(hashed_password){
    return knex("allusers")
     .insert({
       username,
       hashed_password
     });
  }).catch(function(err){
    next(err);
  });
});


app.listen(8000, function(){
  console.log("Listening on 8000...")
})
