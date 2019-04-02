import React, { Component} from "react";
import { BrowserRouter as Router, Link, withRouter } from 'react-router-dom';
import Header from './common/header'
import Routes from './Routes'
import { withCookies, Cookies } from 'react-cookie';
import { compose } from 'recompose'
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
      pointsAvailable: null,
      employees: []
    };
  }
  
  componentDidMount(){
    const { cookies } = this.props;
    if (cookies.get('isAuthenticated') === 'true') {
      this.userHasAuthenticated(true, cookies.get('employeeId') || null);
      
      console.log('***************',this.props.cookies.cookies.employeeId)
      this.state.employeeId = this.props.cookies.cookies.employeeId;
      console.log('^^^^^^^^^^^^^^^',this.state.employeeId)
      
      //console.log('666666', this.state)
      //console.log('--->>>>>',this.state.pointsAvailable)
    } else {
      this.userHasAuthenticated(false, null);
    }
    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = (authenticated, employeeId) => {
    const { cookies } = this.props;
    cookies.set("isAuthenticated", authenticated, {path: "/"});
    cookies.set("employeeId", employeeId, {path: "/"});
    API.get('employees').then(res => {
      const employees = res.data;
      this.setState({ employees: employees });
      console.log('<<<<<<', employees)
      console.log('333333',this.state.employees)

      console.log("****",employeeId)

      let employeeObject = this.state.employees.find(x => x.id == employeeId)
      console.log("&&&&&",employeeObject)

      if (authenticated === true) {
        this.setState({ 
          pointsAvailable: employeeObject.available_points
        })
      }

      
      
      
      this.setState({ 
            isAuthenticated: authenticated, 
            employeeId: employeeId
          });
    })
    
    
  }
  handleLogout = event => {
    this.userHasAuthenticated(false, null);
  }
  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
    return (
      !this.state.isAuthenticating &&
      <div className="App">
        <Header employeeId={this.state.employeeId} pointsAvailable={this.state.pointsAvailable}/>
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