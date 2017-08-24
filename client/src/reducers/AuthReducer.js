import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, SUBMITTING_AUTH, CURRENT_USER } from '../actions/ActionTypes'
const defaultState = {
  isSubmittingAuth: false
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: true };
    case UNAUTH_USER:
      return { ...state, authenticated: false, loggedInUser: null };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case SUBMITTING_AUTH:
      return { ...state, isSubmittingAuth: action.payload };
    case CURRENT_USER:
      return { ...state, loggedInUser: action.payload };
    default:
      return state;
  }
}
