const express = require('express');

const router = express.Router();

const TasksController = require('../controllers/tasks');

router.get('', TasksController.fetchTasks);

module.exports = router;
