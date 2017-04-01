import { FriendRequestModel, FriendRequest } from '../models/FriendRequest';
import { Router, Request, Response, NextFunction } from 'express';

class FriendRequestsController {

  public getFriendRequestsForUser(req: Request, res: Response, next: NextFunction) {
    const query = {};
    if (req.query.from != null) query['from'] = req.query.from;
    if (req.query.to != null) query['to'] = req.query.to;

    FriendRequestModel.find(query)
      .populate({
        path: 'from to',
        select: 'name avatar'
      })
      .then((requests) => {
        res.status(200).json({ friendRequests: requests });
      });
  }

  public updateFriendRequestStatus(req: Request, res: Response, next: NextFunction) {
    const status: String = req.body.status
    if (status == null) return res.status(400).send("bad request, missing field 'status'");

    const userId = req.user.get('id');
    const requestId = req.params.friendRequest_id;

    FriendRequestModel.findByIdAndUpdate(requestId, { status }).then((friendReq: FriendRequest) => {
      /**
       * @todo Create constants for friend request status: PENDING, ACCEPTED, REJECTED
       */
      if (status == 'accepted' && userId != friendReq.to ) {
        return res.status(401).send('Unauthorized');
      }
      res.status(200).json({ status: "FriendRequest updated succesful", friendReq });
    });
  }
  public addFriendRequest(req: Request, res: Response, next: NextFunction) {
    const friendRequest = <FriendRequest>req.body;
    const friendRequestModel = new FriendRequestModel(friendRequest);
    friendRequestModel.status = 'pending';
    friendRequestModel.save().then((f: FriendRequest) => {
      res.status(200).json({ status: "FriendRequest created succesful", f });
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

export default FriendRequestsController;