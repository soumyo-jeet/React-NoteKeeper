const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchUserDetails = require("../middlewares/fetchUserDetails");
const AUTHENTICATED_SIGNATURE = "sonuisbanu";

// posting user's details at /api/auth/newuserauth and fetching the data from the api body and authenticating the user.
router.post("/newuserauth" , [
    body('name', 'Entre a valid name.').isLength({ min: 3}),
    body('email', 'Entre a valid email.').isEmail(),
    body('password', 'Password should be of atleast 5 characters.').isLength({ min: 5 })] , 
    async (req, res) => 
{
    //checking if any feild has invalid value.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // checking if the email already exists.
    let user = await User.findOne({email : req.body.email});
    if (user) {
        return res.status(404).json({error: "User in this email already exists."});
    }

    // creating hash of user's password
    const salt = await bcrypt.genSalt(5);
    const secured_pass = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
        name: req.body.name,
        password: secured_pass,
        email: req.body.email
    });

    const PAYLOAD = {
        user: {
            id : user.id
        }
    } 

    const token = jwt.sign(PAYLOAD, AUTHENTICATED_SIGNATURE);

    res.json({user_details: user, authentication_code: token});
})



// verification of a signed in user at /api/auth/verify
router.post("/verify" , [
    body('email', 'Entre a valid email.').isEmail(),
    body('password', 'Password cannot be empty.').exists()] , 
    async (req, res) => 
{
    //checking if any feild has invalid value.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //finding the user
    let user = await User.findOne({email: req.body.email});
    if (!user){
        return res.status(404).json({error: "Please entre valid credentials."});
    }

    //verifing with password
    let verified = await bcrypt.compare(req.body.password, user.password);
    if(!verified){
        return res.status(404).json({error: "Please entre valid credentials."});
    }

    const PAYLOAD = {
        user: {
            id : user.id
        }
    } 

    const token = jwt.sign(PAYLOAD, AUTHENTICATED_SIGNATURE);

    res.json({token});
})

// Fetching user details from token at /api/auth/datafetch
router.post("/datafetch",
    fetchUserDetails,  // middleware to fetching user details
    async (req, res) => 
{
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.json(user)
    } catch (error) {
        res.status(500).send({error: error})
    }
})


module.exports=router;