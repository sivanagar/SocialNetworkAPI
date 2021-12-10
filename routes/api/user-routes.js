const router = require('express').Router();
const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require('../../controllers/user-controller');

router
  .route('/')
  .get(getAllUser) //get all users
  .post(createUser) //add a user

router 
  .route('/:userId')
  .get(getUserById) // get a user by id
  .put(updateUser) //update a users
  .delete(deleteUser) //delete a user

router
  .route('/:userId/friends/:friendId')
  .post(addFriend) //add a new friend
  .delete(deleteFriend) //delete a friend

module.exports = router;