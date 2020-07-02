const express = require('express');

const router = express.Router();

const TasksController = require('../controllers/tasks');

router.get('', TasksController.fetchTasks);

router.get('/free-time', TasksController.fetchFreeTimeTasks);

router.post('', TasksController.addTask);

router.post('/:id', TasksController.markDone);

router.patch('/:id', TasksController.updateTask);

router.delete('/:id', TasksController.deleteTask);

module.exports = router;
