const router = require('express').Router();
const { handleCreateUser, validateUser } = require('../controllers/user/createUser');

router.post('/create-user', validateUser, handleCreateUser);

module.exports = router;