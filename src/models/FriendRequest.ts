import { User, UserModel } from './User';
import { Schema, model, Document, Connection } from 'mongoose'
import Mongoose = require('mongoose');
import timestamps = require('mongoose-timestamp')

const friendRequestSchema = new Mongoose.Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    index: true
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    index: true
  },
  status: String
});

friendRequestSchema.plugin(timestamps)

interface FriendRequest extends Document {
  from: User,
  to: User,
  status: String,
  createdAt?: String,
  updatedAt?: String
}

const FriendRequestModel = model<FriendRequest>('friendRequest', friendRequestSchema)

export { FriendRequestModel, FriendRequest }