import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Badge from 'material-ui/Badge'
import CommunicationMessage from 'material-ui/svg-icons/communication/message';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import SocialNotifications from 'material-ui/svg-icons/social/notifications';
import SocialPeople from 'material-ui/svg-icons/social/people';
import FriendRequestsContainer from './FriendRequestsContainer.jsx';
import CircularProgress from 'material-ui/CircularProgress';
import _ from 'lodash';

class NotificationsBlock extends Component {
  constructor(props) {
    super(props);

    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.showFriendsNotifications = this.showFriendsNotifications.bind(this);
    this.showMessagesNotifications = this.showMessagesNotifications.bind(this);
    this.showSocialNotifications = this.showSocialNotifications.bind(this);

    this.state = {
      isOpen: false,
      popoverContent: null
    }
  }

  getNotifDefaultStyle() {
    return {
      top: 8,
      right: 12,
      backgroundColor: 'coral'
    };
  }
  renderFriendsNotification() {
    const { newPendingRequests } = this.props;
    const hasNotifs = _.isNumber(newPendingRequests) && newPendingRequests > 0;
    const notifStyle = hasNotifs ?
      this.getNotifDefaultStyle() : _.assign(this.getNotifDefaultStyle(), { display: 'none' });
    return (
      <button className='NotificationsBlock-Button' onTouchTap={this.showFriendsNotifications}>
        <Badge badgeContent={this.props.newPendingRequests} badgeStyle={notifStyle}>
          <SocialPeople />
        </Badge>
      </button>
    );
  }

  renderMessagesNotification() {
    return (
      <button
        className='NotificationsBlock-Button'
        onTouchTap={this.showMessagesNotifications}
      >
        <Badge
          badgeContent={1}
          badgeStyle={{ top: 8, right: 12, backgroundColor: 'coral' }}
        >
          <CommunicationMessage />
        </Badge>
      </button>
    );
  }
  renderSocialNotification() {
    return (
      <button
        className='NotificationsBlock-Button'
        onTouchTap={this.showSocialNotifications}
      >
        <Badge
          badgeContent={2}
          badgeStyle={{ top: 8, right: 12, display: 'none' }}
        >
          <SocialNotifications />
        </Badge>
      </button>
    );
  }

  handleRequestClose() {
    this.setState({
      isOpen: false,
      popoverContent: null
    });
  }

  showFriendsNotifications() {
    const isToggle = this.state.popoverContent === 'FRIENDS_NOTIFICATIONS'
    this.setState({
      isOpen: !isToggle,
      popoverContent: isToggle ? null : 'FRIENDS_NOTIFICATIONS'
    });
  }

  showMessagesNotifications() {
    const isToggle = this.state.popoverContent === 'MESSAGES_NOTIFICATIONS'
    this.setState({
      isOpen: !isToggle,
      popoverContent: isToggle ? null : 'MESSAGES_NOTIFICATIONS'
    });
  }

  showSocialNotifications() {
    const isToggle = this.state.popoverContent === 'SOCIAL_NOTIFICATIONS'
    this.setState({
      isOpen: !isToggle,
      popoverContent: isToggle ? null : 'SOCIAL_NOTIFICATIONS'
    });
  }

  renderPopover() {
    return (
      <Popover
        open={this.state.isOpen}
        anchorEl={this.element}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        targetOrigin={{ horizontal: 'left', vertical: 'top' }}
        useLayerForClickAway={false}
        animation={PopoverAnimationVertical}
        canAutoPosition={true}
        style={{ backgroundColor: '#393836' }}
      >
        {this.getPopoverContent()}
      </Popover>
    );
  }

  getPopoverContent() {
    if (this.props.loadingNotifications) {
      return <CircularProgress />;
    }
    switch (this.state.popoverContent) {
      case 'FRIENDS_NOTIFICATIONS':
        return <FriendRequestsContainer {...this.props} />;
      case 'MESSAGES_NOTIFICATIONS':
        return <div>MESSAGES NOTIFICATIONS</div>;
      case 'SOCIAL_NOTIFICATIONS':
        return <div>SOCIAL NOTIFICATIONS</div>;
      default:
        return null;
    }
  }
  render() {
    return (
      <div className='NotificationsBlock' ref={(el) => { this.element = el; }} >
        {this.renderFriendsNotification()}
        {this.renderMessagesNotification()}
        {this.renderSocialNotification()}
        {this.renderPopover()}
      </div>
    );
  }
}

NotificationsBlock.propTypes = {
  loadingNotifications: PropTypes.bool,
  newPendingRequests: PropTypes.number
}

export default NotificationsBlock;