import React, { Component } from 'react';
import Header from './components/header/Header.jsx';
import ProfileSummary from './components/profileSummary/ProfileSummary.jsx';
import ChatPanel from './components/chatPanel/ChatPanel.jsx';
import ContentContainer from './components/contentContainer/ContentContainer.jsx';
import PropTypes from 'prop-types';
import './App.css';
// import io from 'socket.io-client';

class App extends Component {
//     Commenting this until socketio would be properly implemented
//   constructor(props) {
//     super(props);
//     this.wsConn = io('http://localhost:3000', {
//       reconnectionAttempts: 3,
//       reconnectionDelay: 2000
//     });
//   }
  render() {
    return (
      <div className='App-Container'>
        <Header
          hasNewMessages={true}
          hasNotifications={true}
        />
        <div className={'App-Content'}>
          <ProfileSummary />
          <ContentContainer>
            {this.props.children}
          </ContentContainer>
          <ChatPanel />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  params: PropTypes.object
}
export default App;

