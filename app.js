require('dotenv').config();
require('./connection');
const express = require('express');
const userRoute = require('./routes/userRoute');
const taskRoute = require('./routes/taskRoute');
const subtaskRoute = require('./routes/subtaskRoute');
const updateTaskPrioritiesCronJob = require('./jobs/taskJobs');
const callUserJobs = require('./jobs/callingJobs');

updateTaskPrioritiesCronJob.start();
callUserJobs.start();

const app = express();

app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.status(200).send("Welcome to the Task Management App!");
});

app.use('/api', userRoute);
app.use('/api', taskRoute);
app.use('/api', subtaskRoute);

const port = process.env.PORT;

app.listen(port, () => console.log(`Server is running on port ${port}...`));