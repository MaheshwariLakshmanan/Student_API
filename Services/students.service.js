const Student = require(`../Model/student.model.js`)
const _ = require('lodash');

exports.create = async (req, res) => {
    if (_.isEmpty(req.cookies)) {
        res.json(`Access denied`)
    }
    else {
        const student = new Student({
            name: req.body.name,
            dept: req.body.dept
        })
        student.save()
        res.send(await exports.findAll())
    }
}

exports.findAll = async (req, res) => {
    try {
        const list = Student.find().sort({ name: 1 })
        return list
    } catch (error) {
        res.status(400).json(`Cannot retrieve student list`)
    }
}

exports.findByDept = async (req, res) => {
    try {
        if (_.isEmpty(req.cookies)) {
            res.status(401).json(`Access denied`)
        }
        else {
            res.send(await Student.find({ dept: req.params.dept }))
        }
    } catch (error) {
        res.status(400).json(`Cannot retrieve student list `)
    }
}

exports.update = async (req, res) => {
    try {
        if (_.isEmpty(req.cookies)) {
            res.status(401).send(`Access denied`)
        }
        else {
            await Student.findByIdAndUpdate(req.params.studId, {
                name: req.body.name,
                dept: req.body.dept
            })
            res.send(await Student.findOne({ name: req.body.name }))
        }
    } catch (error) {
        res.json(error)
    }
}

exports.delete = async (req, res) => {
    try {
        if (_.isEmpty(req.cookies)) {
            res.status(401).json(`Access denied`)
        }
        else {
            await Student.findByIdAndRemove(req.params.studId)
            res.send(await exports.findAll())
        }
    } catch (error) {
        res.status(400).json(`Cannot delete student list`)
    }
}