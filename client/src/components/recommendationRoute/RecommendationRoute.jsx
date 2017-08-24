import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { withRouter } from 'react-router';
import { Card, CardActions, CardHeader } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import './RecommendationRoute.css';

const users = [
  {
    name: 'Alexandru Lupse',
    workplace: 'Wayfare',
    avatar: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAa0AAAAJGNkOTFmZGM1LTNjZjctNGU2ZS1hMGEzLWM2NWE1YTUxYjQwNQ.jpg"
  },
  {
    name: 'Andrei Sebastian Cimpean',
    workplace: 'Ixxus',
    avatar: "https://media.licdn.com/mpr/mpr/shrinknp_100_100/AAEAAQAAAAAAAAgsAAAAJGJiOWQxMDljLTNiZTctNDcyYS1hOTliLTlmOWEwODM2NDg4NQ.jpg"
  },
  {
    name: 'Madalina Pintea',
    workplace: 'Softvision',
    avatar: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAc3AAAAJGJjYWZhNjAyLTUwYTQtNGFiYS1iYTlhLTc4ZDRiZTNiYTRkZA.jpg"
  },
  {
    name: 'Robert Cosma',
    workplace: 'Softvision',
    avatar: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/4/005/0a7/073/0d680d4.jpg"
  }
]
class RecommendationRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  renderRecommendationList() {
    return users.map((user, index) => {
      return <div key={index}>
        {this.renderRecommendationItem(user)}
      </div>
    });
  }
  renderRecommendationItem(user) {
    return (
      <Card>
        <CardHeader
          title={user.name}
          subtitle={user.workplace}
          avatar={user.avatar}
        />
        <CardActions>
          <FlatButton label="Connect" primary={true} />
          <FlatButton label="Ignore" primary={true} />
        </CardActions>
      </Card>
    );
  }

  render() {
    return (<div className={'RecommendationRoute'}>
      {this.renderRecommendationList()}
    </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    statsModel: state.content.stats.statsModel
  }
}
RecommendationRoute.propTypes = {
  params: PropTypes.object,
  statsModel: PropTypes.object,
  getStatsForUser: PropTypes.func
}

export default withRouter(connect(mapStateToProps, actions)(RecommendationRoute))