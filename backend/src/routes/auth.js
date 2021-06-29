import express from 'express';
import User from './../models/user.model'
const router = express.Router();
//hash password library
import argon2, { verify } from 'argon2'
//webtoken lib
import jwt from 'jsonwebtoken'
import verifyToken from './../middleware/auth'

/**
 * @route GET api/auth/ 
 * @desc check if user loggedin
 * @access Public
 */

router.get('/', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password')
        if (!user) {
            return res.status(400).json({ success: false, message: 'user not found' })
        }
        res.json({ success: true, user: user })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" })
    }
})


/**
 * @route POST api/auth/register 
 * @desc Register user
 * @access Public
 */

router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    //simple validation
    if (!username || !password || !email) {
        return res.status(400).json({ success: false, message: "Missing email/username/password" })
    }

    try {
        //check for existing account
        const user = await User.findOne({ username: username })
        if (user)
            return res.status(400).json({ success: false, message: "Username already taken" })
        const userE = await User.findOne({ email: email })
        if (userE)
            return res.status(400).json({ success: false, message: "Email existed" })
        if (!user && !userE) {
            //all food
            const hashedPassword = await argon2.hash(password);
            const newUser = new User({ username: username, password: hashedPassword, email: email })
            await newUser.save();

            //Return token
            const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET);

            res.json({ success: true, message: "User created successfuly", accessToken })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" })
    }
})

/**
 * @route POST api/auth/login 
 * @desc Login user
 * @access Public
 */

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    //simple validation
    if (!username || !password) {
        return res.status(400).json({ success: false, message: "Missing username/password" })
    }

    try {
        //check for existing account
        const user = await User.findOne({ username: username })
        if (!user) {
            return res.status(400).json({ success: false, message: "Incorrect username or password" })
        }

        const validPassword = await argon2.verify(user.password, password);
        if (!validPassword) {
            return res.status(400).json({ success: false, message: "Incorrect username or password" })
        }
        //All good
        //Return token
        const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET);

        res.json({ success: true, message: "Logged in successfuly", accessToken })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" })
    }
})


module.exports = router