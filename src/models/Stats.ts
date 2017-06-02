import { User } from './User';
import { Schema, model, Document } from 'mongoose'
import Mongoose = require('mongoose');

const statsSchema = new Mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    index: true
  },
  data: Object
});

export interface StatsData {
  age?: String,
  workplace?: String
}
interface Stats extends Document {
  user: User,
  data: StatsData
}

const StatsModel = model<Stats>('stats', statsSchema)

export { StatsModel, Stats }