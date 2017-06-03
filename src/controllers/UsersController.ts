import { UserModel, User } from '../models/User';
import { StatsModel, Stats, StatsData } from '../models/Stats'
import { Router, Request, Response, NextFunction } from 'express';
import JwtTokenCreator from '../services/JwtTokenCreator';
import ScriptRunner from '../services/ScriptRunner';

class UsersController {

  public getAllUsers(req: Request, res: Response, next: NextFunction) {
    UserModel.find((err, users) => {
      if (err != null) {
        res.send({ error: "Something went wrong" });
      }
      res.status(200).json(users);
    });
  }
  public getStats(req: Request, res: Response, next: NextFunction) {
    const userId: string = req.params.user_id;
    StatsModel.findOne({user: userId})
      .then((stats: Stats) => {
        res.status(200).json(stats)
      })
      .catch((err) => res.status(404).send(err))
  }

  public saveOrUpdateStats(req: Request, res: Response, next: NextFunction) {
    const userId: string = req.params.user_id;
    const data: StatsData = {
      age: req.body.age,
      workplace: req.body.workplace,
    };
    StatsModel.findOneAndUpdate({user: userId}, {data}, {new: true, upsert: true})
      .then((stats: Stats) => {
        res.status(200).json(stats)
      })
      .catch((err) => res.status(404).send(err))
  }

  public getUserWithId(req: Request, res: Response, next: NextFunction) {
    const userId: string = req.params.user_id;
    UserModel.findById(userId, (err, user: User) => {
      if (err != null) {
        console.log(err);
        res.send({ error: "Something went wrong" });
      }
      res.status(200).json(user);
    });
  }

  public addUser(req: Request, res: Response, next: NextFunction) {
    const user = <User>req.body;
    const userModel = new UserModel(user);

    userModel.save.call(this).then((user: User) => {
      const token = JwtTokenCreator.generateToken(user.get('id'), Date.now())
      res.status(200).json({ status: "succesful", token });
    }).catch((error) => {
      /**
       * @todo Create Error Handler
       */
      switch (error.code) {
        case 11000:
          res.status(409).send({
            error: error.message,
            message: "Email already in use"
          });
          break;
        default:
          res.status(400).send({
            error: error.message,
          });
      }
    });
  }
}

export default UsersController;