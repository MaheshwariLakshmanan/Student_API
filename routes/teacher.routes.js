module.exports = (app) => {
    const teacher = require('../Services/teachers.service.js');

    app.post('/register', teacher.create);

    app.post('/login', teacher.login);

    app.post('/logout', teacher.logout);
}
