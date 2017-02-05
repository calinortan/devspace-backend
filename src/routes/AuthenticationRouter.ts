import { Router, Request, Response, NextFunction } from 'express';
import { UserModel, User } from '../models/User';

export class AuthenticationRouter {
  private router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  private init(): void {
    this.router.get('/', this.getAllUsers);
    this.router.get('/:user_id', this.getUserWithId);
    this.router.post('/', this.addUser);
  }

  public getRouter(): Router {
    return this.router
  }

  private getAllUsers(req: Request, res: Response, next: NextFunction) {
    UserModel.find((err, users) => {
      if (err != null) {
        res.send({ error: "Something went wrong" });
      }
      res.status(200).json(users);
    });
  }

  private getUserWithId(req: Request, res: Response, next: NextFunction) {
    const userId: string = req.params.user_id;
    UserModel.findById(userId, (err, user) => {
      if (err != null) {
        console.log(err);
        res.send({ error: "Something went wrong" });
      }
      res.status(200).json(user);
    });
  }

  private addUser(req: Request, res: Response, next: NextFunction) {
    const users = <User>req.body;
    UserModel.insertMany(users).then((users) => {
      res.status(200).json({ status: "succesful" });
    }).catch((error) => {
      res.send({error: error.message});
    });
  }
}

// Create the HeroRouter, and export its configured Express.Router
const authenticationRoutes = new AuthenticationRouter();

export default authenticationRoutes.getRouter();