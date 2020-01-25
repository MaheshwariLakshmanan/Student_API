module.exports = (app) => {
    const student_controller = require('../Controller/student.controller.js');
    const student = require('../Services/students.service.js');

    app.post('/add', student.create);

    app.get('/list', student_controller.read);

    app.get('/list/:dept', student.findByDept);

    app.put('/update/:studId', student.update);

    app.delete('/delete/:studId', student.delete);
}
