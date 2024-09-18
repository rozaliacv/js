const express = require('express');
const bodyParser = require('body-parser');
const main = express();
const sqlite = require("sqlite3").verbose();
const studentRouter = require('./router/student');
const instructorRouter = require('./router/instructor');
const courseRouter = require('./router/course');
const sectionRouter = require('./router/section');
const enrollmentRouter = require('./router/enrollment');
const middleware = require('./middleware/main');



main.use(bodyParser.json());

main.use(middleware);

main.use("/STUDENT" , studentRouter);

main.use("/INSTRUCTOR" , instructorRouter);

main.use("/COURSE" , courseRouter);

main.use("/ENROLLMENT" , enrollmentRouter);

main.use("/SECTION" , sectionRouter);


    
main.listen(3000, () => console.log('Server Started'));
