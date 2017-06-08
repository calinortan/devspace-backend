import { Schema, model, Document, Connection } from 'mongoose'
import Mongoose = require('mongoose');
import timestamps = require('mongoose-timestamp')

const documentSchema = new Mongoose.Schema({
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
documentSchema.plugin(timestamps)

interface IDocument extends Document {
  user?: Schema.Types.ObjectId;
  content?: String;
  image?: String,
  comments?: Schema.Types.ObjectId[],
  age?: Number,
  likes?: Object[],
  createdAt?: String,
  updatedAt?: String
}

const DocumentModel = model<IDocument>('document', documentSchema)

export { DocumentModel, IDocument }