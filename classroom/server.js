const express = require('express');
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: true,
}))
app.use(flash());
app.use((req,res,next)=>{
  res.locals.successMsg = req.flash("success")
  res.locals.errorMsg = req.flash("error")
  next()
})

app.get('/reqcount', (req, res) => {
  if(req.session.count){
    req.session.count++
  }else{
    req.session.count = 1
  }

  res.send(`request count is ${req.session.count} `);
});

app.get("/test",(req,res)=>{
  let {name = "anonymous"} = req.query;
  req.session.name = name;
  if(req.session.name == "anonymous"){
    req.flash("error","user not registerd")
  }else{
  req.flash("success","user registerd successfully")
}
  res.redirect("/hello")
  
});

app.get("/hello",(req,res)=>{
 
  res.render("page.ejs",{name: req.session.name });
});

app.listen(8000, () => console.log('Server running on port 8000'));

