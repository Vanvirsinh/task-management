const Task = require('../../models/tasks');
const Subtask = require('../../models/sub_tasks');
const { getDate } = require('../../utils/date');
const { taskStatusUpdation } = require('../../middleware/statusUpdation');

const handleDeleteSubtask = async (req, res) => {
    try {
        const userId = req.user.id;
        const subtask_id = req.params.subtask_id;

        const subtaskToBeDeleted = await Subtask.findOne({ _id: subtask_id, deleted: false });
        if (!subtaskToBeDeleted) {
            return res.status(404).json({ success: false, message: 'Subtask does not exist!' });
        }

        const userIdOfSubtask = await Task.findOne({ _id : subtaskToBeDeleted.task_id, deleted: false }).select('userId');
        if (!userIdOfSubtask) {
            return res.status(404).json({ success: false, message: 'Main task does not exist!' });
        }
        if (userIdOfSubtask.equals(userId)) {
            return res.status(404).json({ success: false, message: 'You are not authorized to update this task!' });
        }

        await Subtask.findOneAndUpdate({ _id: subtask_id }, { $set: { deleted: true, deleted_at: getDate() } });

        // Check if any subtasks are completed
        await taskStatusUpdation(subtaskToBeDeleted.task_id);

        res.status(201).json({ success: true, message: 'Subtask deleted successfully!' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Oops, something went wrong with server!" });
    }

}
module.exports = { handleDeleteSubtask };