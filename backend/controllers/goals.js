const Goal = require('../models/goal');

exports.fetchGoals = (req, res, next) => {
  Goal.find().then(fetchedGoals => {
    res.status(200).json({
      goals: fetchedGoals
    });
  });
};
