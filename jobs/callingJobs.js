const cron = require('node-cron');
const Task = require('../models/tasks');
const User = require('../models/user');

const callUser = async (phoneNumber, message) => {
    try {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const twilioPhoneNumber = process.env.MY_PHONE_NUMBER;
        const client = require("twilio")(accountSid, authToken);

        const combinedMsg = message.join('');

        await client.calls.create({
            url: "http://demo.twilio.com/docs/voice.xml",
            to: phoneNumber,
            from: twilioPhoneNumber,
            twiml: `<Response><Say>Hey there, this is to remind you about your overdue tasks. Here are they: ${combinedMsg}. Please complete it.</Say></Response>`,
        });

        console.log(`Called to ${phoneNumber} for task: ${combinedMsg}`);

    } catch (error) { 
        console.error(error);
    }
}

// This job will run every day 10 am.
const callUserJobs = cron.schedule('0 10 * * *', async () => {
    try {
        const users = await User.find().sort({ priority: 1 });

        users.forEach(async (user) => {
            const overDueTasks = await Task.find({ userId: user._id, priority: 0, status: { $in: ['IN_PROGRESS', 'TODO'] }, deleted: false });
            if (overDueTasks && overDueTasks.length > 0) {
                const message = [];
                let i = 1;
                overDueTasks.forEach((task) => {
                    console.log(task.title);
                    message.push(`Task ${i} is ${task.title} `);
                    i++;
                });
                await callUser(user.phoneNumber, message);
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Oops, something went wrong with server!" });
    }
})

module.exports = callUserJobs;