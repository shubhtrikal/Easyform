const express = require('express')
const router = express.Router()
const User = require('../model/UserModel')


router.post('/register', async (req, res) => {
    const { name, email } = req.body
    const user = new User({
        name,
        email,
        form : []
    })
    await user.save()
        .then(() => {
            res.status(200).json(user)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
})

router.post('/login', async (req, res) => {
    const { email } = req.body
    await User.findOne({ email })
        .then((user) => {
            if(user)
            res.status(200).json(user)
            else
            res.status(400).json("No user exists")
        })
        .catch((err) => {
            res.status(400).json(err)
        })
})

module.exports = router