import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import Profile from './profile'
import RecentRewards from './recent-rewards'
import Approvals from './approvals'

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
                    <Link to={`${match.url}/recent-rewards`}>Recent Rewards</Link>
                </li>
                <li>
                    <Link to={`${match.url}/approval`}>Approvals</Link>
                </li>
            </ul>
            <div className="Sidebar-Content">
                <Route path={`${match.url}/recent-rewards`} component={RecentRewards}/>
                <Route path={`${match.url}/approval`} component={Approvals}/>
            </div>
        </div>
      </div>
    );
  }
}

export default Overview;
