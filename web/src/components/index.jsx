import React, { Component } from "react";
import { Redirect, Route, BrowserRouter as Router, Link, Switch } from 'react-router-dom';

import Header from './common/header'
import Overview from './overview'
import Recognize from './recognize'
import RewardsActivities from './rewardsActivities'
import Redeem from './redeem'

class NavBar extends Component {
  render() {
    return (
      <div className="NavBar">
        <ul>
          <li>
            <Link to="/overview">Overview</Link>
          </li>
          <li>
            <Link to="/recognize">Recognize</Link>
          </li>
          <li>
            <Link to="/redeem">Redeem Rewards</Link>
          </li>
          <li>
            <Link to="/rewards_acivities">Rewards History</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Router>
          <NavBar />
          <div>
            <Switch>
              <Route path="/overview" component={Overview} />
              <Route path="/recognize" component={Recognize} />
              <Route path="/redeem" component={Redeem} />
              <Route path="/rewards_activities" component={RewardsActivities} />
              <Redirect from="/" to="/overview"/>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
