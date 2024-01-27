const Task = require('../models/tasks');
const Subtask = require('../models/sub_tasks');

const taskStatusUpdation = async (task_id) => {
    try {
        const hasNonCompletedSubtasks = await Subtask.exists({ task_id, status: 0, deleted: false });
        if (!hasNonCompletedSubtasks) {
            await Task.findByIdAndUpdate(task_id, { status: 'DONE' });
        } else {
            const hasCompletedSubtasks = await Subtask.exists({ task_id, status: 1, deleted: false });
            if (hasCompletedSubtasks) {
                await Task.findByIdAndUpdate(task_id, { status: 'IN_PROGRESS' });
            } else {
                await Task.findByIdAndUpdate(task_id, { status: 'TODO' });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Oops, something went wrong with server!" });
    }
}

module.exports = { taskStatusUpdation };

