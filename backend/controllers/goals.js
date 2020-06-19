const Goal = require('../models/goal');

exports.fetchGoals = (req, res, next) => {
  Goal.find().then(fetchedGoals => {
    res.status(200).json({
      goals: fetchedGoals
    });
  })
  .catch(error => {
    res.status(500).json({
      message: 'Could not fetch goals: ' + error
    })
  });
};

exports.addGoal = (req, res, next) => {
  const goal = new Goal({
    goal: req.body.goal,
    done: req.body.done
  });

  goal.save()
  .then(addedGoal => {
    res.status(201).json({
      id: addedGoal._id,
      goal: addedGoal.goal,
      done: addedGoal.done
    });
    console.log('Added: ' + addedGoal);
  })
  .catch(error => {
    res.status(500).json({
      message: 'Could not add goal: ' + error
    });
  });
};

exports.markDone = (req, res, next) => {
  Goal.updateOne({ _id: req.params.id }, { done: req.body.done })
  .then(result => {
    if (result.n > 0) {
      console.log('Goal updated.');
      res.status(200).json({message: 'Goal updated.'});
    } else {
      console.log('Could not update goal.');
    }
  })
  .catch(error => {
    res.status(500).json({
      message: 'Could not update goal:' + error
    });
  });
};

exports.deleteGoal = (req, res, next) => {
  Goal.deleteOne({ _id: req.params.id })
  .then(result => {
    console.log(result);
    if (result.n > 0) {
      console.log('Goal deleted.');
      res.status(200).json({message: 'Goal deleted.'});
    } else {
      console.log('Could not delete goal.');
    }
  })
  .catch(error => {
    res.status(500).json({
      message: 'Could not delete goal: ' + error
    });
  });
};
