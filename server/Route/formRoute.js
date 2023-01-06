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

router.post('/getForm', async (req, res) => {
    const {formID, userID} = req.body 
    const form = await Form.findById(formID)
    let response = {
        que : [],
        admin : false,
    }
    let questions = []
    if(!form) {
        res.status(400).json({message: 'Form or User not found'})
    }
    else {
        if(form.admin == userID) {
            response.admin = true
        }
        for(let i = 0; i < form.questions.length; i++) {
            let question = await Question.findById(form.questions[i])
            questions.push(question)
        }
        response.que = questions
        res.status(200).json(response)
    }
})

router.post('/addQuestion', async (req, res) => {
    const {userID , formID, question, optionA, optionB, optionC, optionD} = req.body
    let form = await Form.findById(formID)
    if(!form) {
        res.status(400).json({message: 'Form or User not found'})
    }
    else {
        if(form.admin == userID) {
            const que = new Question({
                question: question,
                optionA: optionA,
                optionB: optionB,
                optionC: optionC,
                optionD: optionD,
                answer: [],
            })
            await que.save()
            form.questions.push(que._id)
            form = await Form.findByIdAndUpdate(formID, form, {new : true})
            let questions = []
            for(let i = 0; i < form.questions.length; i++) {
                let que = await Question
                .findById(form.questions[i])
                questions.push(que)
            }
            res.status(200).json(questions)
        }
        else {
            res.status(400).json({message: 'You are not admin'})
        }
    }
})

module.exports = router