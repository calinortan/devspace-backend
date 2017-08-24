import App from './App';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import WallContent from './components/wallContent/WallContent.jsx';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import logger from 'redux-logger'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import reducers from './reducers/index';
import reduxThunk from 'redux-thunk';
import React from 'react';
import ReactDOM from 'react-dom';
import RequireAuth from './components/auth/RequireAuth';
import SignIn from './components/auth/SignIn.jsx';
import StatsRoute from './components/stats/Stats.jsx';
import RecommendationRoute from './components/recommendationRoute/RecommendationRoute.jsx';
import { AUTH_USER } from './actions/ActionTypes';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { browserHistory, Router, Route, IndexRoute, Link } from 'react-router'
// Load up the application styles
require('react-tap-event-plugin')();
// Application entrypoint.

// const store = createStore(reducers, applyMiddleware(reduxThunk, logger));
const store = createStore(reducers, applyMiddleware(reduxThunk));
const theme = getMuiTheme(darkBaseTheme, {
  palette: {
    primary1Color: '#32b38c',
    primary2Color: '#32b38c',
    accent1Color: '#808080',
    accent2Color: '#808080'
  }
});

const token = localStorage.getItem('devspace:token');
// If we have a token, consider the user to be signed in
if (token) {
  // we need to update application state
  store.dispatch({ type: AUTH_USER });
}

const UserList = () => {
  return <div>
    <Link to="/58d7a61f11af570bc83e9d34">Calin Ortan</Link><br />
    <Link to="/58d7a61f11af570bc83e9d37">Vlad Tamas</Link><br />
    <Link to="/58d7a61f11af570bc83e9d39">Alexandru Lupse</Link><br />
    <Link to="/58d6bd1bc35cb81e58422210">CRC</Link><br />
    <Link to="/58d7a61f11af570bc83e9d35">Rares Teodorescu</Link><br />
  </div>
}

ReactDOM.render((
  <Provider store={store}>
    <MuiThemeProvider muiTheme={theme}>
      <Router history={browserHistory}>
        <Route path='/login' component={SignIn}></Route>
        <Route path='/' component={RequireAuth(App)}>
          <IndexRoute component={UserList} />
          <Route path='/:user_id' >
            <IndexRoute component={WallContent} />
            <Route path='/:user_id/stats' component={StatsRoute}/>
            <Route path='/:user_id/recommendations' component={RecommendationRoute}/>
          </Route>
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>
), document.getElementById('react-root'));
