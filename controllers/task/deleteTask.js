const Task = require('../../models/tasks');
const { getDate } = require('../../utils/date');

const handleDeleteTask = async (req, res) => {
    try {
        const taskId = req.params.task_id;

        const taskToBeDeleted = await Task.findOne({ userId: req.user.id, _id: taskId, deleted: false });
        if (!taskToBeDeleted) {
            return res.status(404).json({ success: false, message: 'Task does not exist!' });
        }

        await Task.findOneAndUpdate({ userId: req.user.id, _id: taskId }, { $set: { deleted: true, deleted_at: getDate() } });
        res.status(201).json({ success: true, message: 'Task deleted successfully!' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Oops, something went wrong with server!" });
    }

}
module.exports = { handleDeleteTask };