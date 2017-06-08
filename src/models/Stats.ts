import { User } from './User';
import { Schema, model, Document } from 'mongoose'
import Mongoose = require('mongoose');
import timestamps = require('mongoose-timestamp')

const statsSchema = new Mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    index: true
  },
  data: Object
});
statsSchema.plugin(timestamps)

export interface StatsData {
  age?: String,
  workplace?: String
}
interface Stats extends Document {
  user: User,
  data: StatsData,
  createdAt?: String,
  updatedAt?: String
}

const StatsModel = model<Stats>('stats', statsSchema)

export { StatsModel, Stats }