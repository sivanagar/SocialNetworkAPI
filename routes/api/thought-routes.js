const router = require('express').Router();
const {
  getAllThought,
  getThoughtById,
  addThought,
  removeThought,
  updateThought,
  addReaction,
  deleteReaction
} = require('../../controllers/thought-controller');


router
  .route('/')
  .get(getAllThought) //get all thoughts
  .post(addThought) //add a thought

router
  .route('/:thoughtId')
  .get(getThoughtById) //get thought by id
  .put(updateThought) //update thought by id
  .delete(removeThought) //delete thought by id


router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction) // delete reaction

router
  .route('/:thoughtId/reactions')
  .post(addReaction) //add reaction




module.exports = router;