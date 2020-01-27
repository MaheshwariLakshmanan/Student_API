const Staff = require(`../Model/teacher.model.js`)
const nodemailer = require('nodemailer');
const md5 = require('md5');
const bcrypt = require('bcryptjs');

exports.create = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.password, salt);
    name = req.body.name
    pass = hashedpassword
    email = req.body.email
        const staff = new Staff({
            name: name,
            email: email,
            password: pass
        })
        staff.save()
        await main().catch(console.error);   
        res.json('Check your mail to login')  
  }
async function main(req, res) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'maheshwarilcse99@gmail.com',
            pass: '9363142109'
        }
    })
    const mailOptions = {
        from: 'maheshwarilcse99@gmail.com',
        to: email,
        subject: 'Verification mail for your Registration',
        html: `Hello ${name} Thanks for registering, 
         '  ${pass}  Use this token for login purpose'`
    }
    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    })
}

exports.login = async (req, res) => {
    try {
        const user = await Staff.findOne({ name: req.body.name })
        if (!user) res.send(`User not exist`)
        const pwd = await bcrypt.compare(req.body.password, user.password);
        if (!pwd) res.status(400).json({ message: 'Password Not Match' });
        if(req.body.token === user.password){
                res.cookie("userData", user);
                const cookiee = req.cookies;
                res.send(cookiee)
                //res.json('user data added to cookie');
        }
        else{
            res.json('Invalid login details')
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