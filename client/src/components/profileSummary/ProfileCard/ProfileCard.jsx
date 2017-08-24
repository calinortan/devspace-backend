import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import UserInterests from './UserInterests.jsx';
import TechList from './TechList.jsx';
import ProfileCardPlaceholder from './ProfileCardPlaceholder.jsx';
import {Tabs, Tab} from 'material-ui/Tabs';
import InterestsIcon from 'material-ui/svg-icons/action/loyalty';
import CodeIcon from 'material-ui/svg-icons/action/code';
import { Link } from 'react-router'

class ProfileCard extends Component {
  constructor(props) {
    super(props);

    this.handleSendRequest = this.handleSendRequest.bind(this);
  }
  static defaultProps = {
    user: {
      avatar: '',
      name: '',
      workplace: '',
      interests: [],
      programmingLanguages: []
    }
  }

  handleSendRequest() {
    this.props.sendFriendRequest(this.props.user._id);
  }


  getUserAvatar() {
    return <img
      className={'ProfileCard-Avatar'}
      src={this.props.user.avatar}
      alt="user avatar"
    />;
  }

  renderUserInterests() {
    const { interests } = this.props.user;
    return <UserInterests interests={interests}/>
  }

  renderProgrammingLanguages() {
    const { programmingLanguages } = this.props.user;
    return <TechList items={programmingLanguages}/>
  }
  getPendingRequestAction(pendingRequest) {
    const isUserSender = pendingRequest.from._id === this.props.user._id;
    if (isUserSender) {
      return <RaisedButton label='Accept' primary={true} />;
    }
    return <RaisedButton label='Request Sent' secondary={true} />;
  }

  getCardAction() {
    const { isOwnProfile, isConnection, pendingRequest} = this.props;

    if (isOwnProfile) {
      return <RaisedButton label='Edit Profile' secondary={true} />;
    }
    if (isConnection) {
      return <RaisedButton label='Chat' primary={true} />;
    }
    if (pendingRequest != null && pendingRequest.status === 'pending') {
      return this.getPendingRequestAction(pendingRequest);
    }
    return <RaisedButton label='Connect' primary={true} onTouchTap={this.handleSendRequest} />;
  }

  render() {
    if (this.props.isLoadingProfile) return <ProfileCardPlaceholder />;
    return <div className={'ProfileCard'}>
      {this.getUserAvatar()}
      <div className={'ProfileCard-UserName'}>
        <span className={'ProfileCard-UserName-Text'}>
          {this.props.user.name}
        </span>
      </div>
      <div className='ProfileCard-Favorites'>
        <Link to={`/${this.props.user._id}/stats`}>
          See some stats about his connections!!
        </Link>
      </div>
      <div className={'ProfileCard-Workplace'}>
        {this.props.user.workplace}
      </div>
      <div className={'ProfileCard-Actions'}>
        {this.getCardAction()}
      </div>
      <Tabs>
        <Tab icon={<InterestsIcon />} title={'interests'}>
          <div className='ProfileCard-Favorites'>
            here are some interests of {this.props.user.name}
          </div>            
          <div className={'ProfileCard-Interests'}>
            {this.renderUserInterests()}
          </div>
        </Tab>
        <Tab icon={<CodeIcon />} title={'programming languages'} >
          <div className='ProfileCard-Favorites'>
            {this.props.user.name} likes to code in these languages:
          </div>
          <div className={'ProfileCard-TechStack'}>
            {this.renderProgrammingLanguages()}
          </div>
        </Tab>
      </Tabs>
    </div>
  }
}

ProfileCard.propTypes = {
  user: PropTypes.object,
  isLoadingProfile: PropTypes.bool,
  isOwnProfile: PropTypes.bool,
  isConnection: PropTypes.bool,
  sendFriendRequest: PropTypes.func,
  pendingRequest: PropTypes.object
}
export default ProfileCard;