import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import './index.css';

import Overview from './components/overview';
import Recognize from './components/recognize'
import RewardsActivities from './components/rewardsActivities'
import Redeem from './components/redeem'

import * as serviceWorker from './serviceWorker';


const routing = (
    <Router>
      <div>
        <Route exact path="/" component={Overview} />
        <Route path="/recognize" component={Recognize} />
        <Route path="/rewards_activities" component={RewardsActivities} />
        <Route path="/redeem" component={Redeem} />
      </div>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
