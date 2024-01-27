const Task = require('../../models/tasks');
const User = require('../../models/user');
const { query, validationResult } = require('express-validator');

const validateTaskQuery = [
    query('priority').optional().isInt({ min: 0 }).withMessage('Invalid priority'),
    query('due_date').optional().isISO8601().withMessage('Invalid due date format'),
    query('page').optional().isInt({ min: 1 }).withMessage('Invalid page number'),
    query('limit').optional().isInt({ min: 1 }).withMessage('Invalid limit')
];

const handleFetchTasks = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(401).json({ success: false, message: "Please enter valid parameters!", errors: errors.array() });
        }

        const userId = req.user.id;
        const { priority, due_date, page = 1, limit = 10 } = req.query;

        const queryConditions = { userId, deleted: false };

        if (priority) {
            queryConditions.priority = priority;
        }

        if (due_date) {
            queryConditions.due_date = due_date;
        }

        const tasks = await Task.find(queryConditions)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        if(tasks.length === 0) {
            return res.status(404).json({success: false, message: 'No tasks found with this search!'});
        }

        res.status(200).json({ success: true, tasks });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Oops, something went wrong with server!" });
    }

}

module.exports = { handleFetchTasks, validateTaskQuery }