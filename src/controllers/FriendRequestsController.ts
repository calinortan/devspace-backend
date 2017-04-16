import { FriendRequestModel, FriendRequest } from '../models/FriendRequest';
import { addFriend } from '../models/User'
import { Router, Request, Response, NextFunction } from 'express';
import { ModelFindByIdAndUpdateOptions } from 'mongoose'

class FriendRequestsController {

  public getFriendRequestsForUser(req: Request, res: Response, next: NextFunction) {
    const query = {};
    if (req.query.from != null) query['from'] = req.query.from;
    if (req.query.to != null) query['to'] = req.query.to;
    if (req.query.users_id_in != null) {
      const userIds = req.query.users_id_in.split(',');
      query['from'] = { $in: userIds};
      query['to'] = { $in: userIds};
    };

    FriendRequestModel.find(query)
      .populate({
        path: 'from to',
        select: 'name avatar'
      })
      .then((requests) => {
        if (requests == null) return res.status(404);
        res.status(200).json({ friendRequests: requests });
      })
      .catch(err => res.status(400).json({message: err.message}));
  }

  public updateFriendRequestStatus(req: Request, res: Response, next: NextFunction) {
    const status: String = req.body.status
    if (status == null) return res.status(400).send("bad request, missing field 'status'");
    const supportedStatusStates: String[] = ['PENDING', 'ACCEPTED', 'REJECTED'];
    const isRequestValid: Boolean = supportedStatusStates.indexOf(status.toUpperCase()) > -1;
    if (!isRequestValid) {
      return res.status(401).send('Unauthorized');
    }
    const userId = req.user.get('id');
    const requestId = req.params.friendRequest_id;
    const options: ModelFindByIdAndUpdateOptions = {
      new: true
    }
    FriendRequestModel.findByIdAndUpdate(requestId, { status }, options).then((friendReq: FriendRequest) => {
      /**
       * @todo Create constants for friend request status: PENDING, ACCEPTED, REJECTED
       */
      if (userId != friendReq.to) {
        return res.status(401).send('Unauthorized');
      }
      if (status.toUpperCase() === 'ACCEPTED') {
        addFriend(friendReq.from, friendReq.to);
        addFriend(friendReq.to, friendReq.from);
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