const express = require('express');

const GoalsController = require('../controllers/goals');

const router = express.Router();

router.get('', GoalsController.fetchGoals);

router.post('', GoalsController.addGoal);

module.exports = router;
