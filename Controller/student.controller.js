const student = require('../Services/students.service.js')
exports.read = async (req, res) => {
    res.send(await student.findAll())
}

