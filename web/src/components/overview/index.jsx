import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import AppliedRoute from '../AppliedRoute';

import Profile from './profile'
import RecentRewards from './recent-rewards'
import Approvals from './approvals'

import '../../styles/overview.css'
import '../../styles/tab-controls.css'

class Overview extends Component {
  componentDidMount(){
    if(!this.props.isAuthenticated){
      alert('Login In');
      this.props.history.push("/login");
    }
    this.props.setCurrentPage('overview');
  }
  render() {
    const { location, rewards: { pending, approved }, approve_request, reject_request, employeeId, pointsAvailable, imgUrl, firstName, lastName, title, department } = this.props;
    console.log(location);
    return (
      <div className="Overview">
        <Profile employeeId={employeeId} pointsAvailable={pointsAvailable} imgUrl={imgUrl} firstName={firstName} lastName={lastName} title={title} department={department} />
        <div className="Sidebar">
            <div className="TabControls">
              <ul>
                  <li className={location.pathname === '/overview/recent-rewards' ? 'active': ''}>
                      <Link to={`/overview/recent-rewards`}>Recent Rewards</Link>
                  </li>
                  <li className={location.pathname === '/overview/approval' ? 'active': ''}>
                      <Link to={`/overview/approval`}>Approvals</Link>
                  </li>
              </ul>
            </div>
            <div className="Sidebar-Content">
                <AppliedRoute path='/overview/recent-rewards' component={RecentRewards} props={{rewards: approved, employeeId}}/>
                <AppliedRoute path='/overview/approval' component={Approvals} props={{rewards: pending, approve_request, reject_request}}/>
            </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Overview);
