const express = require("express");
const router = express.Router();


router.get("/",(req,res)=>{
    res.send("Get Posts Route")
})
router.post("/",(req,res)=>{
    res.send("Post Posts Route")
})
// Post id
router.get("/:id",(req,res)=>{
    res.send("Get Posts ID Route")
})

router.post("/:id",(req,res)=>{
    res.send("Post Posts ID Route")
})

module.exports = router;