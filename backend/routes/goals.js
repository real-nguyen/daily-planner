const express = require('express');

const GoalsController = require('../controllers/goals');

const router = express.Router();

router.get('', GoalsController.fetchGoals);

router.post('', GoalsController.addGoal);

router.put('/:id', GoalsController.markDone);

router.delete('/:id', GoalsController.deleteGoal);

module.exports = router;
