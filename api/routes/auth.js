const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config()

//REGISTER
router.post('/register', async (req, res) => {

    // in this case I can add if condition to check that is finds are empty and set proper error messages status(400)
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString(),
        isAdmin: req.body.isAdmin
    });
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

    } catch (err) {
        res.status(500).json(err);
    }

})

//LOGIN

// router.post("/login", async (req, res) => {
//     try {
//         const user = await User.findOne({ username: req.body.username }) //find in db
//         !user && res.status(401).json('Wrong credentials!')
//         const hashedPassword = CryptoJS.AES.decrypt(
//             user.password,
//             process.env.PASS_SEC
//         );

//         let originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

//         originalPassword !== req.body.password &&
//             res.status(401).json('Wrong credentials!')  //if the password is incorrect
//         // create an access token and sent to client to authentication and authorization
//         const accessToken = jwt.sign({
//             id: user._id,
//             isAdmin: user.isAdmin,
//         },
//             process.env.JWT_SEC,
//             { expiresIn: "3d" }
//         );

//         const { password, ...others } = user._doc  // to filter out password and send just user information

//         res.status(200).json({ ...others, accessToken }) //if ok, return the user
//     } catch (err) {
//         res.status(500).json(err)
//     }
// })
// module.exports = router;


//when send wrong password or username with following code server work correctly whiteout brake
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username }) //find in db
        if (!user) {
            return res.status(401).json('Wrong credentials!')
        }
        let originalPassword = '';
        try {
            const hashedPassword = CryptoJS.AES.decrypt(
                user.password,
                process.env.PASS_SEC
            );
            originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        } catch (e) {
            console.log(e);
            return res.status(401).json('Wrong credentials!')
        }

        if (originalPassword !== req.body.password) {
            return res.status(401).json('Wrong credentials!')
        }

        // create an access token and send to client for authentication and authorization
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        },
            process.env.JWT_SEC,
            { expiresIn: "3d" }
        );

        const { password, ...others } = user._doc  // to filter out password and send just user information

        res.status(200).json({ ...others, accessToken }) //if ok, return the user
    } catch (err) {
        res.status(500).json(err)
    }
})
module.exports = router;