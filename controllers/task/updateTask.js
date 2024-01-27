const Task = require('../../models/tasks');
const { body, validationResult } = require('express-validator');
const { isValidDateFormat, getDate } = require('../../utils/date');
const { calculatePriority } = require('../../utils/calculatePriority');

const validateUpdateTask = [
    body('title').optional()
        .isLength({ min: 3 }).withMessage('Title should contains minimum 3 characters!')
        .isLength({ max: 50 }).withMessage('Title should not be more than 50 characters!'),
    body('description').optional()
        .isLength({ min: 3 }).withMessage('Title should contains minimum 3 characters!')
        .isLength({ max: 500 }).withMessage('Title should not be more than 50 characters!'),
    body('due_date').optional()
        .custom(isValidDateFormat).withMessage('Invalid date format. Please use "YYYY-MM-DD" format.')
        .isLength({ max: 50 }).withMessage('Title should not be more than 50 characters!'),
    body('isCompleted').optional()
        .isBoolean().withMessage('Field must be a boolean (true/false)!')
];

const handleUpdateTask = async (req, res) => {
    try {
        // Validating inputs 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: "Please enter necessary field!", errors: errors.array() });
        }

        const taskId = req.params.task_id;
        req.body.status = req.body.isCompleted === true ? 'DONE' : 'TODO';
        if(req.body.due_date) {
            req.body.priority = calculatePriority(req.body.due_date);
        }
        req.body.updated_at = getDate();

        const taskToBeUpdated = await Task.findOne({ userId: req.user.id, _id: taskId, deleted: false });
        if (!taskToBeUpdated) {
            return res.status(404).json({ success: false, message: 'Task does not exist!' });
        }

        await Task.findOneAndUpdate({ userId: req.user.id, _id: taskId }, { $set: req.body });
        res.status(201).json({ success: true, message: 'Task updated successfully!' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Oops, something went wrong with server!" });
    }

}

module.exports = { validateUpdateTask, handleUpdateTask }