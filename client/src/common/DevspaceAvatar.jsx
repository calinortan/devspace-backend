import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import PersonIcon from 'material-ui/svg-icons/social/person-outline';


class DevspaceAvatar extends Component {
  getInitialsFromName(name) {
    const initials = name.match(/\b\w/g) || [];
    return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  }

  render() {
    const {src, userName, ...otherProps } = this.props;
    if (src != null) {
      return <Avatar src={src} {...this.otherProps}/>
    }
    if (userName != null) {
      return <Avatar {...otherProps}>
        {this.getInitialsFromName(userName)}
      </Avatar >
    }
    return <Avatar icon={<PersonIcon/>} style={this.props.style} size={this.props.size}/>
  }
}

DevspaceAvatar.propTypes = {
  userName: PropTypes.string,
  src: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.number
}
export default DevspaceAvatar;