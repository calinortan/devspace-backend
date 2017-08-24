import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chip from 'material-ui/Chip';

class UserInterests extends Component {
  renderList() {
    const { interests, chipProps } = this.props;
    return interests.map((interest, index) => {
      return <Chip
        key={index}
        style={{margin:4}}
        {...chipProps}
      >
        {interest}
      </Chip>;
    });
  }
  render() {
    return <div className='UserInterests'>
      {this.renderList()}
    </div>;
  }
}


UserInterests.propTypes = {
  interests: PropTypes.arrayOf(String),
  chipProps: PropTypes.object
}

export default UserInterests;