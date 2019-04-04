import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import AppliedRoute from '../AppliedRoute';

import Profile from './profile'
import RecentRewards from './recent-rewards'
import Approvals from './approvals'

import '../../styles/overview.css'

class Overview extends Component {
  componentDidMount(){
    if(!this.props.isAuthenticated){
      alert('Login In');
      this.props.history.push("/login");
    }
  }
  render() {
    const { rewards: { pending, settled }, approve_request, reject_request } = this.props;
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
                <AppliedRoute path='/overview/recent-rewards' component={RecentRewards} props={{rewards: settled}}/>
                <AppliedRoute path='/overview/approval' component={Approvals} props={{rewards: pending, approve_request, reject_request}}/>
            </div>
        </div>
      </div>
    );
  }
}

export default Overview;
