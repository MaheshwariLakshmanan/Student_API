const mongoose = require(`mongoose`)

const TeacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        maxlength: 30
    }
})

module.exports = mongoose.model('Teacher', TeacherSchema)