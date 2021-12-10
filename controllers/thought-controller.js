const {Thought, User} = require('../models');

const thoughtController = {
  //get all thoughts
  getAllThought(req, res) {
    Thought.find({})
      //.populate({})
      //.select('-__v')
      .sort({ _id: -1})
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // get a thought by id
  getThoughtById({params}, res) {
    Thought.findOne({_id: params.thoughtId})
      //.populate()
      //.select('-__v')
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({message: 'No thought found with this id!'});
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  },
  //add a thought
  addThought({body},res) {
    Thought.create(body)
      .then(({_id}) => {
        return User.findOneAndUpdate(
          {_id: body.userId},
          {$push: {thoughts: _id}},
          {new: true}
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({message: 'No User found with this id!'});
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },
  //delete a thought
  removeThought({params}, res) {
    Thought.findOneAndDelete({_id: params.thoughtId})
      .then(deletedThought => {
        if (!deletedThought) {
          return res.status(404).json({message: 'No Thought with this id!'});
        }
        return User.findOneAndUpdate(
          {username: deletedThought.username},
          {$pull: {thoughts: params.thoughtId}},
          {new: true}
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({message: 'No user found with this username!'});
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },
  //Update a Thought by id
  updateThought({params, body} ,res ) {
    Thought.findOneAndUpdate(
      {_id: params.thoughtId},
      body,
      {new: true, runValidators: true}
    )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({message: 'No thought found with this id!'});
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  },
  //add reaction
  addReaction({params, body}, res) {
    Thought.findOneAndUpdate(
      {_id: params.thoughtId},
      {$push: {reactions: body}},
      {new: true, runValidators: true}
    )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({message: 'No thought found with this id!'});
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  },
  //delete reaction
  deleteReaction({params}, res ) {
    Thought.findOneAndUpdate(
      {_id: params.thoughtId},
      {$pull: {reactions: { _id: params.reactionId}}},
      {new: true}
    )
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({message: 'No thought found with this id!'});
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => res.status(400).json(err));
  }


};

module.exports = thoughtController;