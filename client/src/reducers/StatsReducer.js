import { STATS_LOADED } from '../actions/ActionTypes'
const defaultState = {

}

export default (state = defaultState, action) => {
  switch (action.type) {
    case STATS_LOADED:
      return { ...state, statsModel: action.payload };
    default:
      return state;
  }
}