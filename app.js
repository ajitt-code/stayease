const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const ExpressError = require("./utils/ExpressError.js");
const listings = require("./routes/listing.js")
const reviews = require("./routes/review.js")
const flash = require("connect-flash")
const session = require("express-session")
const sessionOptions ={
  secret:"secretKey",
  resave:false,
  saveUninitialized:true,
  cookie:{
    expiers: Date.now()+  7 * 24 * 60 * 60 * 1000  ,
    maxAge:  7 * 24 * 60 * 60 * 1000 ,
    httpOnly :true
  }
}

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));
app.use(session(sessionOptions))
app.use(flash())
app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
  next()
})


app.get("/", (req, res) => {
  console.log("Hii, I am Root ");
});

app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);

// app.all("/*splat", (req, res, next) => {
//   next(new ExpressError(404, "Page Not Found!"));
// });

// app.use((err,req,res,next)=>{
//   let {statusCode = 500, message = "someting Went wrong"} = err;
//   res.render("listings/error.ejs",{message});

// })

app.listen(8000, () => {
  console.log("app is listning to port 8000");
});
