const router = require('express').Router();
const { handleCreateSubTask, validateSubTasks } = require('../controllers/subtask/createSubtask');
const { fetchUser } = require('../middleware/fetchUser');
const { validateSubtaskQuery, handleFetchSubtasks } = require('../controllers/subtask/fetchSubtasks');
const { validateUpdateSubtask, handleUpdateSubtask } = require('../controllers/subtask/updateSubtask');
const { handleDeleteSubtask } = require('../controllers/subtask/deleteSubtask');

router.post('/create-subtask/:task_id', fetchUser, validateSubTasks, handleCreateSubTask);
router.get('/user-subtasks', fetchUser, validateSubtaskQuery, handleFetchSubtasks);
router.put('/update-subtask/:subtask_id', fetchUser, validateUpdateSubtask, handleUpdateSubtask);
router.delete('/delete-subtask/:subtask_id', fetchUser, handleDeleteSubtask);

module.exports = router;