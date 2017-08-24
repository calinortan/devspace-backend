import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
// import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ForumIcon from 'material-ui/svg-icons/communication/forum';
import Star from 'material-ui/svg-icons/toggle/star';


class DocumentItem extends Component {
  renderDocumentCard() {
    const { document } = this.props;
    return (<Card>
      <CardHeader
        title={document.user.name}
        subtitle={document.user.workplace}
        avatar={document.user.avatar}
      />
      <CardMedia>
        <img src={document.image} alt="" />
      </CardMedia>
      <CardTitle title={document.title} subtitle={new Date(document.createdAt).toDateString()} />
      <CardText>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
    </CardText>
      <CardActions>
        <IconButton tooltip="Like" touch={true} tooltipPosition="top-right"
          hoveredStyle={{ backgroundColor: '#32b38c' }}
        >
          <Star />
        </IconButton>
        <IconButton tooltip="Comments" touch={true} tooltipPosition="top-right"
          hoveredStyle={{ backgroundColor: '#32b38c' }}
        >
          <ForumIcon />
        </IconButton>
      </CardActions>
    </Card>);
  }
  render() {
    return <section className={'DocumentItem'}>
      {this.renderDocumentCard()}
    </section>
  }
}

DocumentItem.propTypes = {
  document: PropTypes.object
}
export default DocumentItem;