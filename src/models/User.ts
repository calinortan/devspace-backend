import { Schema, model, Document, Connection } from 'mongoose'
import Mongoose = require("mongoose");

const userSchema = new Mongoose.Schema({
  email: { 
    type: String,
    unique: true,
    lowercase: true,
  },
  password: String,
  avatar: String,
  name: String,
  age: Number,
  workplace: String,
  interests: [String],
  programmingLanguages: [String],
  computerOS: String,
  mobileOS: String,
  connections: [Schema.Types.ObjectId]
});

interface User extends Document {
  email: String;
  password: String;
  avatar: String,
  name: String,
  age: Number,
  workplace: String,
  interests: String[],
  programmingLanguages: String[],
  computerOS: String,
  mobileOS: String,
  connections: Schema.Types.ObjectId[]
}

const UserModel = model<User>('user', userSchema)

export { UserModel, User }