import { Schema, model, Document, Connection } from 'mongoose'
import Mongoose = require('mongoose');
import timestamps = require('mongoose-timestamp')

const commentSchema = new Mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  content: String,
  image: String,
  comments: {
    type: [Schema.Types.ObjectId],
    ref: 'comment',
    default: []
  },
  likes: {
    type: [Schema.Types.ObjectId],
    default: []
  }
});
commentSchema.plugin(timestamps)

interface Comment extends Document {
  user?: Schema.Types.ObjectId;
  document?: Schema.Types.ObjectId,
  content?: String,
  likes?: Object[],
  createdAt?: String,
  updatedAt?: String
}

const CommentModel = model<Comment>('comment', commentSchema)

export { CommentModel, Comment }