const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cookieParser = require('cookie-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

const dbConfig = require('./Config/database.config.js')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err)
    process.exit()
});

require('./routes/student.routes.js')(app)
require('./routes/teacher.routes.js')(app)

app.get('/', function(req, res) {
    res.json({message: 'Welcome to Student management system'})
})


app.listen(3007, () => {
    console.log("Server is listening on port 3007");
});
