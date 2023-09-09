const express = require('express')
const router = express.Router();

router.get('/',(req,res) => {
    res.json({ hellow : "i am here",hello: "This is second one"}) 
})

module.exports = router