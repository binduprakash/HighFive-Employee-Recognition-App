import React, { Component, useState} from "react";
import { BrowserRouter as Router, Link, withRouter } from 'react-router-dom';
import Header from './common/header'
import Routes from './Routes'
import { withCookies } from 'react-cookie';
import { compose } from 'recompose';
import API from '../api';
import NavBar from './common/NavBar';
import ReactConfetti from 'react-confetti';

require('../styles/login.css')

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      employeeId: null,
      firstName: null,
      lastName: null,
      imgUrl: null,
      pointsAvailable: null,
      employees: [],
      rewards: [],
      levels: [],
      currentPage: null,
      isManager: false,
      showConfetti: false,
    };
    this.approve_request = this.approve_request.bind(this);
    this.reject_request = this.reject_request.bind(this);
  }
  componentDidMount(){
    const { cookies } = this.props;
    if (cookies.get('isAuthenticated') === 'true') {
      this.userHasAuthenticated(true, cookies.get('employeeId') || null, cookies.get('profile') || null);
    } else {
      this.userHasAuthenticated(false, null, {});
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
      if (authenticated && employeeObject !== undefined) {
        newState.pointsAvailable = employeeObject.available_points;
      } 

      this.setState(newState, () => {
        const { employees: freshEmployees, levels } = this.state;
        API.get('rewards').then(res => {
          const rewards = res.data.sort((a, b) => a.id < b.id);
          const mappedRewards = rewards.map((reward) => {
            const from = freshEmployees.find(e => e.id === reward.from_employee_id);
            const to = freshEmployees.find(e => e.id === reward.to_employee_id);
            const level = levels.find(l => l.id === reward.level_id);
            return {
              ...reward,
              to,
              from,
              level
            }
          });
          // sort rewards latest date = > oldest date
          let sortRewards=(a,b) => {
            let comparison =0;
            if (a.created_at > b.created_at) {
              comparison = 1;
            } else if (a.created_at < b.created_at) {
              comparison = -1
            }
            return comparison * -1;
          }
          mappedRewards.sort(sortRewards)
          this.setState({ rewards: mappedRewards });
        })
      })
    })
  }


  userHasAuthenticated = (authenticated, employeeId, { 
    firstName = '',
    lastName = '',
    imgUrl = '',
    title = '',
    department = '',
    isManager = false,
  }) => {
    const { cookies } = this.props;
    cookies.set("isAuthenticated", authenticated, {path: "/"});
    if(authenticated) {
      cookies.set("employeeId", employeeId, {path: "/"});
      cookies.set("profile", {
        firstName,
        lastName,
        title,
        department,
        imgUrl,
        isManager
      }, {path: "/"});
      
      this.setState({ 
        isAuthenticated: authenticated,
        employeeId,
        imgUrl,
        firstName,
        lastName,
        title,
        department,
        isManager
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
    } else {
      this.setState({ 
        isAuthenticated: authenticated,
      });
    }
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
    API.put(`rewards/${id}`, {
      reward_message,
      approver_message,
      to_employee_id, 
      level_id,
      from_employee_id,
      approver_employee_id,
      status,
      approved_at
    }).then(res => {
      const updatedReward = res.data;
      const existingRewards = self.state.rewards;
      const updationIndex = existingRewards.findIndex(rew => rew.id === id);
      // build the from and to objects
      const from = self.state.employees.find(e => e.id === updatedReward.from_employee_id);
      const to = self.state.employees.find(e => e.id === updatedReward.to_employee_id);
      const level = self.state.levels.find(l => l.id === updatedReward.level_id);
      existingRewards[updationIndex] = {
        ...updatedReward,
        from,
        to,
        level
      };
      self.setState({
        rewards: existingRewards
      });
    });
  }

  approve_request(id) {
    const approved_request = this.state.rewards.find(r => r.id === id);
    approved_request.status = 'approved';
    this.update_request(approved_request);
  }

  reject_request(id) {
    const rejected_request = this.state.rewards.find(r => r.id === id);
    rejected_request.status = 'rejected';
    this.update_request(rejected_request);
  }
  
  handleLogout = event => {
    console.log('handle Logout called!');
    const { cookies } = this.props;
    this.userHasAuthenticated(false, null, {});
    cookies.set('isAuthenticated', false, {path: "/"});
    cookies.remove('employeeId', { path: '/' });
    cookies.remove('profile', { path: '/' });
    cookies.remove('cart', { path: '/' });
    this.setState({
      pointsAvailable: null,
    })
  }
  toggleShowConfetti = () => {
    this.setState({showConfetti: !this.state.showConfetti});
  }
  setCurrentPage = (page) => {
    this.setState({currentPage: page});
  }
  render() {
    const { employeeId } = this.state;
    const childProps = {
      rewards: {
        all: this.state.rewards,
        approved: this.state.rewards.filter(rew => rew.status === 'approved' && rew.to_employee_id === parseInt(employeeId)),
        pending: this.state.rewards.filter(rew => rew.status === 'pending' && rew.approver_employee_id === parseInt(employeeId)),
        approvals: this.state.rewards.filter(rew => rew.approver_employee_id === parseInt(employeeId)),
        sent: this.state.rewards.filter(rew => rew.from_employee_id === parseInt(employeeId)),
        received: this.state.rewards.filter(rew => rew.to_employee_id === parseInt(employeeId) && rew.status === 'approved'),
      },
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      employeeId: this.state.employeeId,
      approve_request: this.approve_request,
      reject_request: this.reject_request,
      pointsAvailable: this.state.pointsAvailable,
      imgUrl: this.state.imgUrl,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      title: this.state.title,
      department: this.state.department,
      isManager: this.state.isManager,
      setCurrentPage: this.setCurrentPage,
      refreshEmployeesAndRewards: this.getEmployeesAndRewards,
      toggleShowConfetti: this.toggleShowConfetti,
      showConfetti: this.state.showConfetti
    };
    return (
      !this.state.isAuthenticating &&
      <div className="App">
        {this.state.showConfetti && <ReactConfetti style={{ zIndex: 0 }} />}
        <Header employeeId={this.state.employeeId} pointsAvailable={this.state.pointsAvailable} imgUrl={this.state.imgUrl} firstName={this.state.firstName}/>
        <Router>
          <NavBar showLogin={this.state.isAuthenticated} handleLogout={this.handleLogout} currentPage={this.state.currentPage}/>
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