import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ProfileRouteLinks from './ProfileRouteLinks.jsx'

class ContentContainer extends Component {
  render() {
    return <section className={'ContentContainer'}>
      <ProfileRouteLinks/>
      {this.props.children}
    </section>
  }
}

ContentContainer.propTypes = {
  children: PropTypes.element
}
export default ContentContainer;