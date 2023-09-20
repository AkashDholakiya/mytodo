const express = require('express')
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const JWT_SECRET = "akashworkI$ng"
const fetchuser = require("../middleware/fetchuser")


// Route 1 for creating user
router.post('/createuser', [
    body('name', 'length of the name should be greater than 3').isLength({ min: 3 }),
    body('email', 'enter a valid email ').isEmail(),
    body('password',"password should be atleast of length 5").isLength({ min: 5 })
],async (req,res) => {
    let success = false;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    try{
    let user = await User.findOne({email : req.body.email});
    if(user){
      return res.status(400).json({success, error : "Sorry a user with this email already exist"})
    }

    const salt = await bcrypt.genSalt(10);
    secPass = await bcrypt.hash(req.body.password,salt); 

    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password : secPass,
      })
      const data = {
        user:{
          id : user.id
        }
      }
      const authToken = jwt.sign(data, JWT_SECRET);

      // console.log(authToken);
      success = true;
      res.json({success, authToken});
    }catch(err){
      console.error(err.message);
      res.status(500).send(success, "error found");  
    }
})

// Route 2 : Authenticate a User : POST "/api/auth/login". No login required
router.post('/login', [
  body('email', 'enter a valid email ').isEmail(),
  body('password', 'password cannot be blank ').exists(),
],async (req,res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const success = false;
    return res.status(400).json({success, errors: errors.array() });
  }

  const {email,password}  = req.body;
  try{
    let user = await User.findOne({email});
    if(!user){
      const success = false;
      return res.status(400).json({success,error : "Try to login with correct credentials"});
    }

    const passcomp = await bcrypt.compare(password,user.password);
    if(!passcomp) {
      const success = false;
      return res.status(400).json({success, error : "Try to login with correct credentials"});
    }
 
    const data = {
      user:{
        id : user.id 
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    const success = true;
    res.json({success, authToken});
  }catch(err){
    console.error(err.message);
    const success = false;
    res.status(500).send(success,"error occured");  
  }
})


// Route 3 : For logged in user details
router.post('/getuser',fetchuser ,async (req,res) => {

    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password")
      res.send(user)
    } catch (error) {
      console.error(err.message);
      res.status(500).send("error occured");  
    }
});

module.exports = router  