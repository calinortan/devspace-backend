import { DOCUMENTS_LOADED } from '../actions/ActionTypes'
const defaultState = {
  loadedDocuments: []
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case DOCUMENTS_LOADED:
      return { ...state, loadedDocuments: action.payload };
    default:
      return state;
  }
}