const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    dept : {
        type : String,
        required : true,
        trim : true
    }
})


module.exports = mongoose.model('Student', StudentSchema)