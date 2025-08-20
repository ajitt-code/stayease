const express = require("express");
const router = express.Router();

router.get("/",(req,res)=>{
    res.send("Get Users Route")
})
router.post("/",(req,res)=>{
    res.send("Post Users Route")
})
// User id
router.get("/:id",(req,res)=>{
    res.send("Get Users ID Route")
})

router.post("/:id",(req,res)=>{
    res.send("Post Users ID Route")
})

module.exports = router;