const express = require('express')
const router = express.Router()
const User = require('../model/UserModel')
const Form = require('../model/FormModel')
const Question = require('../model/QuestionModel')

router.post('/createForm', async (req, res) => {
    const {userID, title, description} = req.body

    let user = await User.findById(userID)

    if(!user) {
        res.status(400).json({message: 'User not found'})
    }
    else {
        const form = new Form({
            title: title,
            description: description,
            admin: userID,
            questions: [],
        })
        await form.save()
        user.form.push(form._id)
        user = await User.findByIdAndUpdate(userID, user, {new: true})
        res.status(200).json(user)
    }
})

router.get('/getAllForm/:id', async (req, res) => {
    const userID = req.params.id
    let forms = [];
    const user = await User.findById(userID)
    if(!user) {
        res.status(400).json({message: 'User not found'})
    }
    else {
        for(let i = 0; i < user.form.length; i++) {
            let form = await Form.findById(user.form[i])
            forms.push(form)
        }
        res.status(200).json(forms)
    }
})

router.get('/getForm/:id', async (req, res) => {
    const formID = req.params.id
    const form = await Form.findById(formID)
    let questions = []
    if(!form) {
        res.status(400).json({message: 'Form not found'})
    }
    else {
        for(let i = 0; i < form.questions.length; i++) {
            let question = await Question.findById(form.questions[i])
            questions.push(question)
        }
        res.status(200).json(questions)
    }
})

module.exports = router