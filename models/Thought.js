const { schema, model, Schema } = require('mongoose');
const dateFormat= require('../utils/dateFormat')

const ReactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: true,
    //280 characters maximum
    maxLength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal)
  }
},
{
  toJSON: {
    getters: true
  }
});

const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    //Must be between 1 and 280 characters
    minLength: 1,
    maxLength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal)
  },
  // The user that created this thought
  username: {
    type: String,
    required: true
  },
  reactions: [ReactionSchema]
},
{
  toJSON: {
    virtuals: true,
    getters: true
  }
}
);


const Thought = model('Thought' , ThoughtSchema);
ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
})
module.exports = Thought;