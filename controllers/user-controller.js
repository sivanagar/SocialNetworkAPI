const {User} = require('../models')

const userController = {
//get all users
getAllUser(req,res) {
  User.find({})
    .populate({
      path: 'thoughts',
      select: '-__v'
    })
    .select('-__v')
    .sort({ _id: -1 })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
},
//get user by Id
getUserById({params}, res) {
  User.findOne({_id: params.userId})
    .populate({
      path: 'thoughts',
      select: '-__v'
    })
    .select('-__v')
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({message: 'No user found with this id!'})
        return;
      }
      res.json(dbUserData)
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
},
//create User
createUser({body}, res) {
  User.create(body)
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.status(400).json);
},
//Update user by id
updateUser({params, body}, res) {
  User.findOneAndUpdate({_id: params.userId}, body , {new:true, runValidators: true})
    .then(dbUserDate => {
      if (!dbUserDate) {
        res.status(404).json({message: 'No user found with this id.'});
        return;
      }
      res.json(dbUserDate);
    })
    .catch(err => res.status(400).json(err));
},
//delete a user
deleteUser({params}, res) {
  User.findOneAndDelete({_id: params.userId})
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({message: 'No user found with this id.'});
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
}
};

module.exports = userController;