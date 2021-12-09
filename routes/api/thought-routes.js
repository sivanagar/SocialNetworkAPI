const router = require('express').Router();


router
  .route('/')
  .get() //get all thoughts
  .post() //add a thought

router
  .route('/:thoughtId')
  .get() //get thought by id
  .put() //update thought by id
  .delete() //delete thought by id

router
  .route('/:thoughtId/reactions')
  .post() //add reaction

router
  .route('/:thoughtId/reactions/:reactionId')
  .delete() // delete reaction
