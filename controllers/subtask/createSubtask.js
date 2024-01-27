const Subtask = require('../../models/sub_tasks');
const Task = require('../../models/tasks');
const { body, validationResult } = require('express-validator');
const { taskStatusUpdation } = require('../../middleware/statusUpdation');

const validateSubTasks = [
    body('title')
        .isLength({ min: 3 }).withMessage('Title should contains minimum 3 characters!')
        .isLength({ max: 50 }).withMessage('Title should not be more than 50 characters!'),
]

const handleCreateSubTask = async (req, res) => {
    try {
        // Validating inputs 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(401).json({ success: false, message: "Please enter necessary field!", errors: errors.array() });
        }

        const task_id = req.params.task_id;

        const associatedTask = await Task.findOne({ _id: task_id, deleted: false });
        if (!associatedTask) {
            return res.status(404).json({ success: false, message: "No associated task found with this task_id!" })
        }

        const { title } = req.body;
        const newSubtask = new Subtask({ title, task_id });
        const newCreatedSubtask = await newSubtask.save();

        // Check if any subtasks are completed
        await taskStatusUpdation(newCreatedSubtask.task_id);

        res.status(201).json({ success: true, message: 'New Subtask created successfully!' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Oops, something went wrong with server!" });
    }

}

module.exports = { handleCreateSubTask, validateSubTasks };