import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentsList from './documentsList/DocumentsList.jsx';
import AddCommentDialog from './AddCommentDialog.jsx';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { withRouter } from 'react-router';
import './WallContent.css';

class WallContent extends Component {
  componentDidMount() {
    const { getDocumentsFromUser, params, currentUser } = this.props;
    const loggedInUserId = currentUser ? currentUser._id:null;
    const viewedUserId = params.user_id;
    viewedUserId != null ?
      /**@todo add new action for getting docs for logged in user's friends */
      getDocumentsFromUser(viewedUserId) : getDocumentsFromUser(loggedInUserId);
  }

  componentWillUpdate(nextProps) {
    const { getDocumentsFromUser, params, currentUser } = this.props;
    const nextUserId = nextProps.params.user_id;
    if (nextUserId !== params.user_id) {
      const loggedInUserId = currentUser._id;
      const nextUserId = params.user_id;
      nextUserId != null ?
        /**@todo add new action for getting docs for logged in user's friends */
        getDocumentsFromUser(nextUserId) : getDocumentsFromUser(loggedInUserId);
    }
  }
  render() {
    return <div className={'WallContent'}>
      <AddCommentDialog />
      <DocumentsList {...this.props} />
    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    documents: state.content.wall.loadedDocuments,
    currentUser: state.auth.currentUser
  }
}

WallContent.propTypes = {
  children: PropTypes.element,
  documents: PropTypes.arrayOf(Object),
  currentUser: PropTypes.object,
  params: PropTypes.object,
  getDocumentsFromUser: PropTypes.func
}
export default withRouter(connect(mapStateToProps, actions)(WallContent));