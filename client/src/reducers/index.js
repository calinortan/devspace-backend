import { combineReducers } from 'redux';
import { reducer as ReduxFormReducer } from 'redux-form';
import AuthReducer from './AuthReducer';
import ProfileReducer from './ProfileReducer';
import NotificationsReducer from './NotificationsReducer';
import WallReducer from './WallReducer';
import StatsReducer from './StatsReducer';

const rootReducer = combineReducers({
  form: ReduxFormReducer,
  auth: AuthReducer,
  profile: ProfileReducer,
  notifications: NotificationsReducer,
  content: combineReducers({
    wall: WallReducer,
    stats: StatsReducer
  })
});

export default rootReducer;
