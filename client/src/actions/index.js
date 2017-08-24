import axios from 'axios';
import { browserHistory } from 'react-router'
import _ from 'lodash';
import firebaseDb from '../firebase';
import {
  AUTH_USER, AUTH_ERROR, SUBMITTING_AUTH, GET_FRIEND_REQUESTS, FRIEND_REQUEST_SENT,
  UNAUTH_USER, CURRENT_USER, VIEW_USER, LOADING_PROFILE, LOADING_NOTIFIACTIONS,
  SET_PENDING_REQUEST, ACCEPT_FRIEND_REQUEST, FRIEND_REQUEST_NOTIF, DOCUMENTS_LOADED,
  STATS_LOADED
} from './ActionTypes';

export function signInUser({ email, password }) {
  // redux-thunk allows our action creators to return a function instead of an object
  // the function will be called with the dispatch method from the store
  // this allows us to add logic in our action creator on what action to dispatch
  return (dispatch) => {
    dispatch(submittingForm(true));
    axios.post('https://young-springs-34209.herokuapp.com/api/v1/session', { email, password })
      .then(response => {
        dispatch(submittingForm(false));
        dispatch({ type: AUTH_USER });
        const { token, currentUser } = response.data
        dispatch(setCurrentUser(currentUser));
        localStorage.setItem('devspace:token', token);
        localStorage.setItem('devspace:currentUserId', currentUser._id);
        browserHistory.push('/');
        return firebaseDb.ref(`/friend-requests/${currentUser._id}`).on('value', (snapshot) => {
          dispatch({ type: FRIEND_REQUEST_NOTIF, payload: snapshot.val() });
        });
      })
      .catch(() => {
        dispatch(submittingForm(false));
        dispatch(authError('Bad Login Info'));
      });
  }
}

export function getLoggedInUser() {
  return (dispatch) => {
    const currentUserId = localStorage.getItem('devspace:currentUserId');
    const token = localStorage.getItem('devspace:token')
    if (currentUserId == null || token == null) {
      dispatch(signOutUser());
    } else {
      axios.get(`https://young-springs-34209.herokuapp.com/api/v1/users/${currentUserId}`, {
        headers: { 'Authorization': token }
      })
        .then(response => {
          dispatch(setCurrentUser(response.data));
          return firebaseDb.ref(`/friend-requests/${currentUserId}`).on('value', (snapshot) => {
            dispatch({ type: FRIEND_REQUEST_NOTIF, payload: snapshot.val() });
          });
        }).catch(() => dispatch(signOutUser()));
    }
  }
}

export function signOutUser() {
  localStorage.removeItem('devspace:token');
  localStorage.removeItem('devspace:currentUserId');
  return { type: UNAUTH_USER };
}

export function setCurrentUser(user) {
  return {
    type: CURRENT_USER,
    payload: user
  }
}

export function viewUser(user, isOwnProfile) {
  return {
    type: VIEW_USER,
    payload: user,
    isOwnProfile
  }
}

export function authError(err) {
  return {
    type: AUTH_ERROR,
    payload: err
  }
}

function submittingForm(isSubmitting) {
  return {
    type: SUBMITTING_AUTH,
    payload: isSubmitting
  }
}

export function setCurrentProfileUser(userId) {
  return (dispatch) => {
    const loggedInUserId = localStorage.getItem('devspace:currentUserId');
    const token = localStorage.getItem('devspace:token');
    const currentUserId = userId || loggedInUserId;
    if (currentUserId == null) {
      dispatch(signOutUser());
    } else {
      const isOwnProfile = (userId == null) || (userId === loggedInUserId);
      dispatch(loadingProfile(true));
      axios.all([
        axios.get('https://young-springs-34209.herokuapp.com/api/v1/friend-requests', {
          headers: { 'Authorization': token },
          params: {
            users_id_in: _.trimEnd([loggedInUserId, userId].toString(), ',')
          }
        }),
        axios.get(`https://young-springs-34209.herokuapp.com/api/v1/users/${currentUserId}`, {
          headers: { 'Authorization': token }
        })
      ])
        .then(axios.spread((friendRequestResponse, userResponse) => {
          const pendingFriendRequests = friendRequestResponse.data.friendRequests;
          _.isEmpty(pendingFriendRequests) ?
            dispatch(setPendingFriendRequest(null)) : dispatch(setPendingFriendRequest(pendingFriendRequests[0]));

          dispatch(viewUser(userResponse.data, isOwnProfile));
          dispatch(loadingProfile(false));
        }))
        .catch(() => {
          dispatch(signOutUser());
        });
    }
  }
}

function setPendingFriendRequest(friendRequest) {
  return {
    type: SET_PENDING_REQUEST,
    payload: friendRequest
  }
}

function loadingProfile(isLoading) {
  return {
    type: LOADING_PROFILE,
    payload: isLoading
  }
}

function loadingNotifications(isLoading) {
  return {
    type: LOADING_NOTIFIACTIONS,
    payload: isLoading
  }
}

export function getFriendRequests() {
  return (dispatch) => {
    const loggedInUserId = localStorage.getItem('devspace:currentUserId');
    const token = localStorage.getItem('devspace:token');
    if (loggedInUserId == null) {
      dispatch(signOutUser());
    } else {
      dispatch(loadingNotifications(true));
      axios.get('https://young-springs-34209.herokuapp.com/api/v1/friend-requests', {
        headers: { 'Authorization': token },
        params: {
          to: loggedInUserId
        }
      })
        .then(response => {
          dispatch({ type: GET_FRIEND_REQUESTS, payload: response.data.friendRequests });
          dispatch(loadingNotifications(false));
        })
        .catch((err) => {
          throw (err);
        });
    }
  };
}

export function sendFriendRequest(userId) {
  return (dispatch) => {
    const loggedInUserId = localStorage.getItem('devspace:currentUserId');
    const token = localStorage.getItem('devspace:token');
    if (loggedInUserId == null) {
      dispatch(signOutUser());
    } else {
      axios({
        method: 'POST',
        url: 'https://young-springs-34209.herokuapp.com/api/v1/friend-requests',
        headers: { 'Authorization': token },
        data: {
          from: loggedInUserId,
          to: userId
        }
      }).then(response => {
        dispatch(friendRequestSent(response.data));
      }).catch((err) => {
        throw (err);
      });
    }
  }
}

function friendRequestSent(friendRequest) {
  return {
    type: FRIEND_REQUEST_SENT,
    payload: friendRequest
  }
}

export function acceptFriendRequest(friendRequestId) {
  return (dispatch) => {
    const loggedInUserId = localStorage.getItem('devspace:currentUserId');
    const token = localStorage.getItem('devspace:token');
    if (loggedInUserId == null) {
      dispatch(signOutUser());
    } else {
      axios({
        method: 'PUT',
        headers: { 'Authorization': token },
        url: `https://young-springs-34209.herokuapp.com/api/v1/friend-requests/${friendRequestId}`,
        data: { status: 'accepted' }
      }).then(response => {
        dispatch(friendRequestAccepted(response.data.friendReq));
      }).catch((err) => {
        throw (err);
      });
    }
  }
}

function friendRequestAccepted(friendRequest) {
  return {
    type: ACCEPT_FRIEND_REQUEST,
    payload: friendRequest
  }
}

export function getDocumentsFromUser(userId) {
  const token = localStorage.getItem('devspace:token');
  return (dispatch) => {
    axios({
      method: 'GET',
      headers: { 'Authorization': token },
      url: `https://young-springs-34209.herokuapp.com/api/v1/documents?user=${userId}`
    }).then(response => {
        dispatch(documentsLoaded(response.data.documents));
      }).catch((err) => {
        throw (err);
      });
  }
}

function documentsLoaded(docs) {
  return {
    type: DOCUMENTS_LOADED,
    payload: docs
  }
}

export function getStatsForUser(userId) {
  const token = localStorage.getItem('devspace:token');
  return (dispatch) => {
    axios({
      method: 'GET',
      headers: { 'Authorization': token },
      url: `https://young-springs-34209.herokuapp.com/api/v1/users/${userId}/stats`
    }).then(response => {
        dispatch(statsLoaded(response.data));
      }).catch((err) => {
        throw (err);
      });
  }
}

function statsLoaded(docs) {
  return {
    type: STATS_LOADED,
    payload: docs
  };
}