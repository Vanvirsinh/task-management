const mongoose = require('mongoose');
const URI = process.env.MONGODB_URI || "mongodb://localhost:27017/task-management/";

mongoose.connect(URI)
    .then(() => {
        console.log("Connected to Database!");
    })
    .catch((err) => {
        console.log(`Error occurred while connecting to DB: ${err}`);
    });