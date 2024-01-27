const Subtask = require('../../models/sub_tasks');
const Task = require('../../models/tasks');
const { body, validationResult } = require('express-validator');
const { getDate } = require('../../utils/date');
const { taskStatusUpdation } = require('../../middleware/statusUpdation');

const validateUpdateSubtask = [
    body('isCompleted').isBoolean().withMessage('Field must be a boolean (true/false)!'),
]

const handleUpdateSubtask = async (req, res) => {
    try {
        // Validating inputs 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: "Please enter necessary field!", errors: errors.array() });
        }

        const userId = req.user.id;
        const subtaskId = req.params.subtask_id;
        req.body.status = req.body.isCompleted === true ? 1 : 0;
        req.body.updated_at = getDate();

        const subtaskToBeUpdated = await Subtask.findOne({ _id: subtaskId, deleted: false });
        if (!subtaskToBeUpdated) {
            return res.status(404).json({ success: false, message: 'Subtask does not exist!' });
        }

        const userIdOfSubtask = await Task.findOne({ _id: subtaskToBeUpdated.task_id, deleted: false }).select('userId');
        if (!userIdOfSubtask) {
            return res.status(404).json({ success: false, message: 'Main task does not exist!' });
        }
        if (userIdOfSubtask.equals(userId)) {
            return res.status(404).json({ success: false, message: 'You are not authorized to update this task!' });
        }

        await Subtask.findOneAndUpdate({ _id: subtaskId }, { $set: req.body });

        // Check if any subtasks are completed
        await taskStatusUpdation(subtaskToBeUpdated.task_id);
        res.status(201).json({ success: true, message: 'Subtask updated successfully!' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Oops, something went wrong with server!" });
    }
}

module.exports = { validateUpdateSubtask, handleUpdateSubtask }