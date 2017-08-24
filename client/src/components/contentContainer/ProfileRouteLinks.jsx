import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import * as actions from '../../actions';
import { withRouter, Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';


class ProfileRouteLinks extends Component {

  render() {
    const userId = this.props.params.user_id;
    if (userId == null) return null;
    return <div className={'ProfileRouteLinks'}>
      <Link to={`/${userId}`}><FlatButton label="Wall" primary={true} /></Link>
      <Link to={`/${userId}/stats`}><FlatButton label="Stats" primary={true} /></Link>
      <Link to={`/${userId}/recommendations`}><FlatButton label="Recommendations" primary={true} /></Link>
    </div>
  }
}

const mapStateToProps = (state) => ({currentUser: state.auth.currentUser});

ProfileRouteLinks.propTypes = {
  params: PropTypes.object
}
export default withRouter(connect(mapStateToProps, null)(ProfileRouteLinks));