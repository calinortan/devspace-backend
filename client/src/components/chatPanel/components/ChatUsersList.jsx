import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import DevspaceAvatar from '../../../common/DevspaceAvatar.jsx'

class ChatUsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    const img = 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAsCAAAAJDBhMjM3YmIxLWY1ZmQtNDUyMS1iODVlLTIzZDgxZjBkYjRkMA.jpg'
    return <section className={'ChatUsersList'}>
      <List>
      <Subheader>Recent chats</Subheader>
      <ListItem
        primaryText={<div className='x'>Andrei Ortan</div>}
        leftAvatar={<Avatar src={img} size={35} style={{top:'5.5px'}}/>}
        rightIcon={<CommunicationChatBubble style={{top:'0'}}/>}
        style={{
          fontSize: '14px'
        }}
        innerDivStyle={{
          padding: '15px 56px 15px 72px'
        }}
      />
      <ListItem
        primaryText={<div className='x'>Alexandra Ulici</div>}
        leftAvatar={<Avatar src={'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAO-AAAAJGQwM2VkN2I5LTY5ZDMtNDlkZC05MDNjLWFiOGE0ZWFjYzYzNg.jpg'} size={35} style={{top:'5.5px'}}/>}
        rightIcon={<CommunicationChatBubble style={{top:'0'}}/>}
        style={{
          fontSize: '14px'
        }}
        innerDivStyle={{
          padding: '15px 56px 15px 72px'
        }}
      />
      <ListItem
        primaryText={<div className='x'>Bogdan Roman</div>}
        leftAvatar={<DevspaceAvatar size={35} style={{top:'5.5px', position:'absolute'}} userName={undefined}/>}
        rightIcon={<CommunicationChatBubble style={{top:'0'}}/>}
        style={{
          fontSize: '14px'
        }}
        innerDivStyle={{
          padding: '15px 56px 15px 72px'
        }}
      />
      <ListItem
        primaryText={<div className='x'>Vlad Tamas</div>}
        leftAvatar={<DevspaceAvatar size={35} style={{top:'5.5px', position:'absolute'}} userName={'Vlad Tamas'}/>}
        rightIcon={<CommunicationChatBubble style={{top:'0'}}/>}
        style={{
          fontSize: '14px'
        }}
        innerDivStyle={{
          padding: '15px 56px 15px 72px'
        }}
      />
    </List>
    </section>
  }
}

ChatUsersList.propTypes = {
  user: PropTypes.object,
  hasNewMessages: PropTypes.bool,
  hasNotifications: PropTypes.bool
}
export default ChatUsersList;