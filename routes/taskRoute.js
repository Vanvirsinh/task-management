const router = require('express').Router();
const { fetchUser } = require('../middleware/fetchUser');
const { handleCreateTask, validateTask } = require('../controllers/task/createTask');
const { handleFetchTasks, validateTaskQuery } = require('../controllers/task/fetchTasks');
const { validateUpdateTask, handleUpdateTask } = require('../controllers/task/updateTask');
const { handleDeleteTask } = require('../controllers/task/deleteTask');

router.post('/create-task', fetchUser, validateTask, handleCreateTask);
router.get('/user-tasks', fetchUser, validateTaskQuery, handleFetchTasks);
router.put('/update-task/:task_id', fetchUser, validateUpdateTask, handleUpdateTask);
router.delete('/delete-task/:task_id', fetchUser, handleDeleteTask);

module.exports = router;