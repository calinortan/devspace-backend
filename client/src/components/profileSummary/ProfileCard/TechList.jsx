import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import {
  grey300, grey500, grey900, yellow500, yellow700, red500, red700,
  green500, green700, green900, blue500, blue700, indigo500, indigo700
} from 'material-ui/styles/colors';


class TechList extends Component {
  getChipColorsForLanguage(lang) {
    switch (lang.toUpperCase()) {
      case 'JAVASCRIPT':
        return {
          backgroundColor: yellow500,
          labelColor: grey900,
          avatarBackgroundColor: yellow700
        };
      case 'JAVA':
        return {
          backgroundColor: red500,
          labelColor: grey300,
          avatarBackgroundColor: red700
        };
      case 'PYTHON':
        return {
          backgroundColor: green700,
          labelColor: grey300,
          avatarBackgroundColor: green900
        };
      case 'ANDROID':
        return {
          backgroundColor: green500,
          labelColor: grey300,
          avatarBackgroundColor: green700
        };  
      case 'C/C++':
        return {
          backgroundColor: grey300,
          labelColor: grey900,
          avatarBackgroundColor: grey500
        };
      case 'C#':
        return {
          backgroundColor: blue500,
          labelColor: grey300,
          avatarBackgroundColor: blue700
        };
      case 'PHP':
        return {
          backgroundColor: indigo500,
          labelColor: grey300,
          avatarBackgroundColor: indigo700
        };
      default:
        return {}
    }
  }
  renderList() {
    const { items } = this.props;
    return items.map((item, index) => {
      const colors = this.getChipColorsForLanguage(item);
      return <Chip
        key={index}
        style={{ margin: 4 }}
        backgroundColor={colors.backgroundColor}
        labelColor={colors.labelColor}
        labelStyle={{ fontWeight: 600 }}
      >
        <Avatar size={32} color={colors.labelColor} backgroundColor={colors.avatarBackgroundColor}>
          {index + 1}
        </Avatar>
        {item}
      </Chip>;
    });
  }
  render() {
    return <div className='TechList'>
      {this.renderList()}
    </div>;
  }
}


TechList.propTypes = {
  items: PropTypes.arrayOf(String)
}

export default TechList;