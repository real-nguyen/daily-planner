const express = require('express');

const router = express.Router();

const TasksController = require('../controllers/tasks');

router.get('', TasksController.fetchTasks);

router.put('/:id', TasksController.markDone);

router.delete('/:id', TasksController.deleteTask);

router.post('', TasksController.addTask);

module.exports = router;
