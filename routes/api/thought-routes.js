const router = require('express').Router();
const {
  getAllThought,
  getThoughtById,
  addThought,
  removeThought,
  updateThought
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


//TODO: reactions routes 
// router
//   .route('/:thoughtId/reactions')
//   .post() //add reaction

// router
//   .route('/:thoughtId/reactions/:reactionId')
//   .delete() // delete reaction
