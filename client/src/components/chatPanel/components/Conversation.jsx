import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chip from 'material-ui/Chip';
import { CardHeader } from 'material-ui/Card';
import DevspaceAvatar from '../../../common/DevspaceAvatar.jsx';
import TextField from 'material-ui/TextField';
import { green400, grey300, grey500, grey50 } from 'material-ui/styles/colors';

const messages = [
  {
    text: 'This is the very first message of our conversation',
    userId: '123'
  },
  {
    text: 'I can t give you a better response ',
    userId: '321'
  },
  {
    text: 'cool ',
    userId: '321'
  },
  {
    text: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ',
    userId: '123'
  }
]
class Conversation extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  getMessageChip(text, isOwnMessage) {
    const chipProps = {
      backgroundColor: isOwnMessage ? green400 : grey500,
      labelColor: isOwnMessage ? grey300 : grey50,
      labelStyle: {
        whiteSpace: 'initial',
        maxWidth: '200px',
        display: 'block',
        padding: 0,
        lineHeight: '20px'
      },
      style: {
        padding: '7px',
        boxSize: 'border-box'
      }
    }
    return <Chip {...chipProps}>
      {text}
    </Chip>;
  }
  renderMessage(message) {
    const isOwnMessage = message.userId === this.props.currentUserId;
    const additionalClass = isOwnMessage ?
      'Conversation-Messages-Chip-OwnMessage' : 'Conversation-Messages-Chip-ConnectionMessage'
    return <div className={`Conversation-Messages-Chip ${additionalClass}`}>
      {this.getMessageChip(message.text, isOwnMessage)}
    </div>;
  }
  renderMessagesList() {
    return messages.map((msg, index) => {
      return <div key={index}>
        {this.renderMessage(msg)}
      </div>
    });
  }
  renderTextInput() {
    return <TextField
      hintText="Type in your message"
      multiLine={true}
    />;
  }
  render() {

    return <section className={'Conversation'}>
      <CardHeader
        title="Alexandra Ulici"
        subtitle="Accenture"
        avatar={<DevspaceAvatar src={'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAO-AAAAJGQwM2VkN2I5LTY5ZDMtNDlkZC05MDNjLWFiOGE0ZWFjYzYzNg.jpg'} size={35} style={{top:'5.5px'}} userName='Alexandra Ulici'/>}
        style={{backgroundColor:'#32b38c', padding:'6px'}}
        textStyle={{paddingLeft: '10px'}}
      />
      <div className={'Conversation-Messages'}>
        {this.renderMessagesList()}
      </div>
      <div className={'Conversation-Input'}>
        {this.renderTextInput()}
      </div>
    </section>
  }
}

Conversation.propTypes = {
  currentUserId: PropTypes.string,
  otherUserId: PropTypes.string
}
export default Conversation;