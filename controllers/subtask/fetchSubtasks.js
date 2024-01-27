const Subtask = require('../../models/sub_tasks');
const Task = require('../../models/tasks');
const { query, validationResult } = require('express-validator');

const validateSubtaskQuery = [
    query('task_id').optional()
];

const handleFetchSubtasks = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: "Please enter necessary field!", errors: errors.array() });
        }

        const userId = req.user.id;
        const { task_id } = req.query;
        const queryConditions = { userId, deleted: false };

        if (task_id) {
            queryConditions._id = task_id;
        }

        const tasks = await Task.find(queryConditions).select('_id');
        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ success: false, message: 'Tasks not found!' });
        }

        const taskIds = tasks.map(task => task._id);
        const subtasks = await Subtask.find({ task_id: { $in: taskIds }, deleted: false });

        if (!subtasks || subtasks.length === 0) {
            return res.status(404).json({ success: false, message: 'Subtasks not found!' });
        }
        return res.status(200).json({ success: true, subtasks });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Oops, something went wrong with server!" });
    }

}

module.exports = { validateSubtaskQuery, handleFetchSubtasks }