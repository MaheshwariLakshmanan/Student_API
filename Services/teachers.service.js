const Teacher = require(`../Model/teacher.model.js`)

exports.create = async (req, res) => {
    const teacher = new Teacher({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }, { collection: `teacher` })
    teacher.save()
    res.send(await exports.findAll())
}

exports.findAll = async (req, res) => {
    try {
        const list = Teacher.find().sort({ name: 1 })
        return list
    } catch (error) {
        res.status(400).json(`Cannot retrieve student list`)
    }
}

exports.login = async (req, res) => {
    try {
        const user = await Teacher.findOne({ name: req.body.name })
        const pass = user.password
        if (!user) res.send(`User not exist`)

        else {
            if (req.body.password === pass) {
                res.cookie("userData", user);
                const cookiee = req.cookies;
                res.send(req.cookies)
                //res.json('user data added to cookie');
            }
            else {
                res.status(401).json(`Password doesn't match`)
            }
        }
    } catch (error) {
        res.send(error)
    }
}

exports.logout = async (req, res) => {
    try {
        res.clearCookie(`userData`);
        res.send(`user logout successfully`);
    } catch (error) {
        res.send(error)
    }
}