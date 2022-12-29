const mongoose = require('mongoose')
const Schema = mongoose.Schema

const formSchema = new Schema({
    title : {
        type: String,
        required: true,
    },
    description : {
        type: String,
        required: true,
    },
    admin : {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    questions : [{
        type: Schema.Types.ObjectId,
        ref: 'Question',
    }],
})

const Form = mongoose.model('Form', formSchema)

module.exports = Form
