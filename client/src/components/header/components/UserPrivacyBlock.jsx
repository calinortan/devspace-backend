import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

class UserPrivacyBlock extends Component {
  constructor(props) {
    super(props);

    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.state = {
      isOpen: false
    }
  }

  getAvatarBox() {
    return <div className={'UserPrivacyBlock-AvatarBox'}>
      <img
        className={'UserPrivacyBlock-AvatarBox-Image'}
        src={this.props.user.avatar}
        alt="your profile"
      />
      <span
        className={'UserPrivacyBlock-AvatarBox-Status'}>
      </span>
    </div>
  }

  getUserNameText() {
    return <div className={'UserPrivacyBlock-UserName'}>
      <span className={'UserPrivacyBlock-UserName-Text'}>
        {this.props.user.name}
      </span>
    </div>
  }

  handleTouchTap(event) {
    this.setState({
      isOpen: !this.state.isOpen,
      anchorEl: event.currentTarget
    });
  }
  handleRequestClose() {
    this.setState({
      isOpen: false
    });
  }
  handleSignOut() {
    this.setState({
      isOpen: false
    });
    this.props.onSignOut();
  }

  renderPopover() {
    return (
      <Popover
        open={this.state.isOpen}
        anchorEl={this.state.anchorEl}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        targetOrigin={{ horizontal: 'left', vertical: 'top' }}
        useLayerForClickAway={false}
        onRequestClose={this.handleRequestClose}
        animation={PopoverAnimationVertical}
      >
        <Menu>
          <MenuItem primaryText="Help &amp; feedback" />
          <MenuItem primaryText="Settings" />
          <MenuItem primaryText="Sign out" onTouchTap={this.handleSignOut} />
        </Menu>
      </Popover>
    );
  }
  render() {
    return (
      <div className={'UserPrivacyBlock'} onTouchTap={this.handleTouchTap}>
        {this.getAvatarBox()}
        {this.getUserNameText()}
        {this.renderPopover()}
      </div>
    );
  }
}

UserPrivacyBlock.propTypes = {
  user: PropTypes.object,
  onSignOut: PropTypes.func
}
export default UserPrivacyBlock;