import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import Profile from './profile'
import RecentRewards from './recent-rewards'
import Approvals from './approvals'

import '../../styles/overview.css'

class Overview extends Component {
  render() {
    const { match } = this.props;
    console.log(this.props);
    console.log(match.url)
    return (
      <div className="Overview">
        <h1>Overview</h1>
        <Profile />
        <div className="Sidebar">
            <ul>
                <li>
                    <Link to={`/overview/recent-rewards`}>Recent Rewards</Link>
                </li>
                <li>
                    <Link to={`/overview/approval`}>Approvals</Link>
                </li>
            </ul>
            <div className="Sidebar-Content">
                <Route path='/overview/recent-rewards' component={RecentRewards}/>
                <Route path='/overview/approval' component={Approvals}/>
            </div>
        </div>
      </div>
    );
  }
}

export default Overview;
