const Task = require('../models/tasks');
const cron = require('node-cron');
const { calculatePriority } = require('../utils/calculatePriority');

// This job will run every day 9 am.
const updateTaskPrioritiesCronJob = cron.schedule('0 9 * * *', async () => {
    try {
        const tasks = await Task.find({ deleted: false });
        tasks.forEach(async (task) => {
            task.priority = calculatePriority(task.due_date);
            await task.save();
        });

        console.log('Task priorities updated successfully');

    } catch (error) {
        console.error(error);
    }
})

module.exports = updateTaskPrioritiesCronJob;