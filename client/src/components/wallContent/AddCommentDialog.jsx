import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class AddCommentDialog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  renderTextArea() {
    return <TextField
      hintText="post content"
      floatingLabelText="Post content"
      multiLine={true}
      rows={4}
      fullWidth={true}
    />;
  }

  getActions() {
    return [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />]
  }

  render() {
    return (
      <div>
        <RaisedButton label="Dialog" onTouchTap={this.handleOpen} />
        <Dialog
          title="Dialog With Actions"
          actions={this.getActions()}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          {this.renderTextArea()}
        </Dialog>
      </div>
    );
  }
}