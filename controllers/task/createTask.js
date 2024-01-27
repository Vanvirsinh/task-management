const Task = require('../../models/tasks');
const { body, validationResult } = require('express-validator');
const { isValidDateFormat } = require('../../utils/date');
const { calculatePriority } = require('../../utils/calculatePriority');

const validateTask = [
    body('title')
        .isLength({ min: 3 }).withMessage('Title should contains minimum 3 characters!')
        .isLength({ max: 50 }).withMessage('Title should not be more than 50 characters!'),
    body('description')
        .isLength({ min: 3 }).withMessage('Title should contains minimum 3 characters!')
        .isLength({ max: 500 }).withMessage('Title should not be more than 50 characters!'),
    body('due_date')
        .custom(isValidDateFormat).withMessage('Invalid date format. Please use "YYYY-MM-DD" format.')
        .isLength({ max: 50 }).withMessage('Title should not be more than 50 characters!'),
]

const handleCreateTask = async (req, res) => {
    try {
        // Validating inputs 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(401).json({ success: false, message: "Please enter necessary field!", errors: errors.array() });
        }

        const { title, description, due_date } = req.body;
        req.body.priority = calculatePriority(due_date);
        const newTask = new Task({ title, description, due_date, priority: req.body.priority, userId: req.user.id });
        await newTask.save();
        res.status(201).json({ success: true, message: 'Task created successfully!' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Oops, something went wrong with server!" });
    }

}

module.exports = { handleCreateTask, validateTask }