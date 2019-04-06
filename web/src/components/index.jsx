import React, { Component} from "react";
import { BrowserRouter as Router, Link, withRouter } from 'react-router-dom';
import Header from './common/header'
import Routes from './Routes'
import { withCookies, Cookies } from 'react-cookie';
import { compose } from 'recompose';
import API from '../api';

require('../styles/navbar.css')


class NavBar extends Component {
  render() {
    const {showLogin, handleLogout} = this.props;
    return (
      <div className="header_2">
        <ul className="main-nav">
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
            <Link to="/rewards_activities">Rewards History</Link>
          </li>
          <li>
            {showLogin
              ? <Link to="/login" onClick={handleLogout}>Logout</Link>
              : <Link to="/login">Login</Link>
            }
          </li>
        </ul>
      </div>
    );
  }
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      employeeId: null,
      imgUrl: null,
      firstName: null,
      pointsAvailable: null,
      employees: [],
      rewards: [],
      levels: []
    };
    this.approve_request = this.approve_request.bind(this);
    this.reject_request = this.reject_request.bind(this);
  }
  componentDidMount(){
    const { cookies } = this.props;
    if (cookies.get('isAuthenticated') === 'true') {
      this.userHasAuthenticated(true, cookies.get('employeeId') || null, cookies.get('imgUrl') || null, cookies.get('firstName') || null);
    } else {
      this.userHasAuthenticated(false, null, null, null);
    }
    this.setState({ isAuthenticating: false });
  }
  getEmployeesAndRewards = (authenticated, employeeId) => {
    API.get('employees').then(res => {
      const employees = res.data;
      let newState = {
        employees
      };

      let employeeObject = employees.find(x => x.id == employeeId)
      if (authenticated === true & employeeObject !== undefined) {
        newState.pointsAvailable = employeeObject.available_points;
      }
      this.setState(newState, () => {
        const { employees: freshEmployees, levels } = this.state;
        API.get('rewards').then(res => {
          const rewards = res.data;
          const mappedRewards = rewards.map((reward) => {
            const from = freshEmployees.find(e => e.id == reward.from_employee_id);
            const to = freshEmployees.find(e => e.id == reward.to_employee_id);
            const level = levels.find(l => l.id == reward.level_id);
            return {
              ...reward,
              to,
              from,
              level
            }
          });
          this.setState({ rewards: mappedRewards });
        })
      })
    })
  }
  userHasAuthenticated = (authenticated, employeeId, imgUrl, firstName) => {
    const { cookies } = this.props;
    cookies.set("isAuthenticated", authenticated, {path: "/"});
    cookies.set("employeeId", employeeId, {path: "/"});
    cookies.set("imgUrl", imgUrl, {path: "/"});
    cookies.set("firstName", firstName, {path: "/"});
    
    this.setState({ 
      isAuthenticated: authenticated,
      employeeId: employeeId,
      imgUrl: imgUrl,
      firstName: firstName
    });
    const self = this;
    API.get('points_levels').then(res => {
      const levels = res.data;
      this.setState({
        levels
      }, () => {
        self.getEmployeesAndRewards(authenticated, employeeId);
      })
    });
  }

  update_request(request) {
    const { 
      id,
      reward_message,
      approver_message,
      to_employee_id, 
      level_id,
      from_employee_id,
      approver_employee_id,
      status,
      approved_at
     } = request;
    const self = this;
    API.patch(`rewards/${id}`, {
      data: {
        reward_message,
        approver_message,
        to_employee_id, 
        level_id,
        from_employee_id,
        approver_employee_id,
        status,
        approved_at
      }
    }).then(res => {
      const updatedReward = res.data;
      const existingRewards = self.rewards;
      const updationIndex = existingRewards.findIndex(rew => rew.id == id);
      existingRewards[updationIndex] = updatedReward;
      this.setState({
        rewards: existingRewards
      });
    });
  }

  approve_request(id) {
    console.log(`approved ${id}`)
    const approved_request = this.state.rewards.find(r => r.id == id);
    approved_request.status = 'approved';
    this.update_request(approved_request);
  }

  reject_request(id) {
    console.log(`rejected ${id}`)
    const rejected_request = this.state.rewards.find(r => r.id == id);
    rejected_request.status = 'rejected';
    this.update_request(rejected_request);
  }
  
  handleLogout = event => {
    const { cookies } = this.props;
    this.userHasAuthenticated(false, null);
    this.setState({ 
      pointsAvailable: null
    })
    cookies.set('cart', '');
  }
  render() {
    const childProps = {
      rewards: {
        all: this.state.rewards,
        settled: this.state.rewards.filter(rew => rew.status !== 'pending'),
        pending: this.state.rewards.filter(rew => rew.status == 'pending'),
      },
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      employeeId: this.state.employeeId,
      approve_request: this.approve_request,
      reject_request: this.reject_request,
      pointsAvailable: this.state.pointsAvailable
    };
    return (
      !this.state.isAuthenticating &&
      <div className="App">
        <Header employeeId={this.state.employeeId} pointsAvailable={this.state.pointsAvailable} imgUrl={this.state.imgUrl} firstName={this.state.firstName}/>
        <Router>
          <NavBar showLogin={this.state.isAuthenticated} handleLogout={this.handleLogout}/>
          <div>
            <Routes childProps={childProps} />
          </div>
        </Router>
      </div>
    );
  }
}

export default compose( 
  withCookies
)(App);