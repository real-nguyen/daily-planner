const express = require('express');

const GoalsController = require('../controllers/goals');

const router = express.Router();

router.get('', GoalsController.fetchGoals);

module.exports = router;
