import { Schema, model, Document, Connection } from 'mongoose'
import Mongoose = require('mongoose');
import bcrypt = require('bcrypt')

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
  connections: {
    type: [Schema.Types.ObjectId],
    ref: 'user' 
  }
});

userSchema.pre('save', function (next) {
  bcrypt.genSalt(10).then((salt: string) => {
    bcrypt.hash(this.password, salt)
      .then((encrypted: string) => {
        this.password = encrypted;
        next();
      })
      .catch((err: Error) => next(err));
  }).catch((err: Error) => next(err));
});

userSchema.methods.handleLoginAttempt = function(submittedPassword: string, callback: any) {
  bcrypt.compare(submittedPassword, this.password).then((isMatch: boolean) => {
    return callback(null, isMatch);
  }).catch((err: Error) => callback(err));
}


interface User extends Document {
  email?: String;
  password?: String;
  avatar?: String,
  name?: String,
  age?: Number,
  workplace?: String,
  interests?: String[],
  programmingLanguages?: String[],
  computerOS?: String,
  mobileOS?: String,
  connections?: Schema.Types.ObjectId[]
  handleLoginAttempt?: (submittedPassword: String, callback: (err: Error, isMatch: boolean) => void) => void
}

const UserModel = model<User>('user', userSchema)
const addFriend = (userId: User, friendId: User): Mongoose.DocumentQuery<User, User> => {
  return UserModel.findByIdAndUpdate(
    userId,
    { $addToSet: { connections: friendId } },
    (err, user) => { if (err) console.log(err) }
  );
}


export { UserModel, User, addFriend }