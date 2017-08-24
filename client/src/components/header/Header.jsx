import React, { Component } from 'react';
import UserPrivacyBlock from './components/UserPrivacyBlock.jsx'
import NotificationsBlock from './components/NotificationsBlock.jsx'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router'
import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    if (this.props.user == null) {
      this.props.getLoggedInUser();
    }
  }

  renderPrivacyBlock() {
    const { user, signOutUser } = this.props;
    if (user == null) return null;
    return (
      <div className='Header-Block Header-User'>
        <UserPrivacyBlock
          user={user}
          onSignOut={signOutUser}
        />
      </div>
    );
  }

  renderNotificationsBlock() {
    const {
      friendRequests, getFriendRequests, loadingNotifications,
      acceptFriendRequest, newPendingRequests } = this.props;
    return (
      <div className='Header-Block Header-Events'>
        < NotificationsBlock
          friendRequests={friendRequests}
          getFriendRequests={getFriendRequests}
          loadingNotifications={loadingNotifications}
          acceptFriendRequest={acceptFriendRequest}
          newPendingRequests={newPendingRequests}
        />
      </div>
    );
  }

  render() {

    return (
      <div className='Header'>
        <Link to="/">
          <div className='Header-Text Header-Block'>
            Devspace
          </div>
        </Link>

        {this.renderNotificationsBlock()}
        {this.renderPrivacyBlock()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.loggedInUser,
  friendRequests: state.notifications.friendRequests,
  loadingNotifications: state.notifications.loadingNotifications,
  newPendingRequests: state.notifications.newPendingRequests
});

Header.propTypes = {
  user: PropTypes.object,
  signOutUser: PropTypes.func,
  getLoggedInUser: PropTypes.func,
  getFriendRequests: PropTypes.func,
  friendRequests: PropTypes.array,
  loadingNotifications: PropTypes.bool,
  acceptFriendRequest: PropTypes.func,
  newPendingRequests: PropTypes.number
}
export default connect(mapStateToProps, actions)(Header);