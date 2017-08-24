import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router'
import _ from 'lodash';


class FriendRequestsContainer extends Component {

  componentDidMount() {
    const { friendRequests, getFriendRequests } = this.props;
    if (friendRequests == null) {
      getFriendRequests();
    }
  }

  renderFriendRequests() {
    const { friendRequests } = this.props;
    if (friendRequests == null) return null;
    if (_.isEmpty(friendRequests)) return <div>No friend requests !</div>;

    return friendRequests.map((friendRequest) => {
      return (
        <li className='FriendRequestsContainer-List-Item' key={friendRequest._id}>
          <Avatar src={friendRequest.from.avatar} />
          <div className='FriendRequestsContainer-List-Item-Name'>
            <Link to={`/${friendRequest.from._id}`}>{friendRequest.from.name}</Link>
          </div>
          {this.getRequestActions(friendRequest)}
        </li>
      );
    })
  }

  getRequestActions(friendReq) {
    if (friendReq.status === 'pending') {
      return (
        <div>
          <RaisedButton
            label='Connect'
            primary={true}
            style={{ marginRight: '15px' }}
            onTouchTap={() => this.props.acceptFriendRequest(friendReq._id)}
          />
          <RaisedButton label='Reject' secondary={true} />
        </div>
      );
    }
    if (friendReq.status === 'accepted') {
      return (
        <div>
          <RaisedButton label='Chat' secondary={true} style={{ marginRight: '15px' }} />
          <RaisedButton label='Accepted' secondary={true} />
        </div>
      );
    }
  }

  render() {
    return (
      <div className='FriendRequestsContainer'>
        <ul className='FriendRequestsContainer-List'>
          {this.renderFriendRequests()}
        </ul>
      </div>
    );
  }
}
FriendRequestsContainer.propTypes = {
  friendRequests: PropTypes.array,
  getFriendRequests: PropTypes.func,
  acceptFriendRequest: PropTypes.func
}
export default FriendRequestsContainer;