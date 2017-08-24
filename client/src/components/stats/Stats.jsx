import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getColorObjects } from '../../common/DevspaceUtils'
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { withRouter } from 'react-router';
import { Pie, Doughnut, Bar } from 'react-chartjs';
import _ from 'lodash';
import { GridList, GridTile } from 'material-ui/GridList';
import UserInterests from '../profileSummary/ProfileCard/UserInterests.jsx';
import { green400, grey300, green100 } from 'material-ui/styles/colors';
import CircularProgress from 'material-ui/CircularProgress';
import {Toolbar, ToolbarTitle} from 'material-ui/Toolbar';
import './Stats.css';

class StatsRoute extends Component {
  constructor(props) {
    super(props);
    this.gridTileStyle = {
      display: 'flex',
      justifyContent: 'center',
      paddingTop: '25px',
      boxSizing: 'border-box'
    }
    this.state = {

    }
  }
  componentDidMount() {
    const { getStatsForUser, params } = this.props;
    getStatsForUser(params.user_id);
  }

  componentWillUpdate(nextProps) {
    const { getStatsForUser, params } = this.props;
    const nextUserId = nextProps.params.user_id;
    if (nextUserId !== params.user_id) {
      getStatsForUser(params.user_id);
    }
  }
  createStatData(stat) {
    const statKeys = _.keys(stat);
    const colorObjects = getColorObjects(statKeys.length);
    return statKeys.map((company, index) => {
      return {
        color: colorObjects[index].color,
        highlight: colorObjects[index].highlightColor,
        label: company,
        value: (parseFloat(stat[company]) * 100).toFixed(2)
      }
    });
  }

  renderDoughnutChart(statKey, title) {
    const osObject = this.props.statsModel.data[statKey];
    if (osObject == null) {
      return;
    }
    const data = this.createStatData(osObject)

    return <GridTile
      key={_.uniqueId('chart_')}
      title={title}
      actionPosition="left"
      titlePosition="top"
      titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
      cols={1}
      rows={1}
      style={this.gridTileStyle}
    >
      <div>
        <Doughnut data={data} options={{ outerRadius: 300 }} width="300" height="300" />
      </div>
    </GridTile>
  }
  renderWorkplacePiechart() {
    const companiesObject = this.props.statsModel.data.workplace;
    if (companiesObject == null) {
      return null;
    }
    const piechartData = this.createStatData(companiesObject)

    return <GridTile
      key={_.uniqueId('chart_')}
      title={'Piechart on workplaces stats'}
      actionPosition="left"
      titlePosition="top"
      titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
      cols={2}
      rows={1}
      style={this.gridTileStyle}
    >
      <div>
        <Pie data={piechartData} options={{ outerRadius: 300 }} width="300" height="300" />
      </div>
    </GridTile>
  }

  renderProgrammingLangsBarChart() {
    const dataModel = this.props.statsModel.data.programmingLanguages;
    if (dataModel == null) {
      return;
    }
    const langs = _.sortBy(_.keys(dataModel))
    const data = {
      datasets: [
        {
          data: langs.map(l => dataModel[l]),
          fillColor: green400,
          strokeColor: green100
        }
      ],
      labels: langs
    }

    return <GridTile
      key={_.uniqueId('chart_')}
      title={'Piechart on workplaces stats'}
      actionPosition="left"
      titlePosition="top"
      titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
      cols={2}
      rows={1}
      style={this.gridTileStyle}
    >
      <div>
        <Bar
          data={data}
          options={{ outerRadius: 300 }}
          height="300"
          width="600"
        />
      </div>
    </GridTile>
  }
  renderInterestsGridTile() {
    const interestsModel = this.props.statsModel.data.interests;
    if (interestsModel == null) {
      return null;
    }
    const data = _.keys(interestsModel)
    const chipProps = {
      backgroundColor: green400,
      labelColor: grey300,
      labelStyle: { fontWeight: 600 }

    }
    return <GridTile
      key={_.uniqueId('chart_')}
      title={'Connections are interested in'}
      actionPosition="left"
      titlePosition="top"
      titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
      cols={1}
      rows={1}
      style={_.assign({}, this.gridTileStyle, { paddingTop: '50px', paddingLeft: '10px' })}
    >
      <div>
        <UserInterests interests={data} chipProps={chipProps} />
      </div>
    </GridTile>
  }
  renderTiles() {
    return [this.renderInterestsGridTile(),
      this.renderDoughnutChart('age', 'Age ranges'),
      this.renderDoughnutChart('computerOS', 'Computer OS doughnut chart'),
      this.renderDoughnutChart('mobileOS', 'Mobile OS doughnut chart'),
      this.renderProgrammingLangsBarChart(),
      this.renderWorkplacePiechart()
    ].filter(tile => tile != null);
  }
  render() {
    if (this.props.statsModel == null) {
      return <CircularProgress size={80} thickness={5} />;
    }
    return <section className={'StatsRoute'}>
      <Toolbar>
        <ToolbarTitle text='Charts on current connections'/>
      </Toolbar>
      <div className='StatsRoute-GridList'>
        <GridList
          cols={2}
          cellHeight={350}
          padding={1}
        >
          {this.renderTiles()}
        </GridList>
      </div>
    </section>
  }
}
const mapStateToProps = (state) => {
  return {
    statsModel: state.content.stats.statsModel
  }
}
StatsRoute.propTypes = {
  params: PropTypes.object,
  statsModel: PropTypes.object,
  getStatsForUser: PropTypes.func
}

export default withRouter(connect(mapStateToProps, actions)(StatsRoute))