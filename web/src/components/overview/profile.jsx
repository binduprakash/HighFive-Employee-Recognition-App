import React, { Component } from 'react';
import Avatar from 'react-avatar';
import {Table} from 'react-bootstrap';

class Profile extends Component {
  render() {
    const { firstName, lastName, imgUrl, title, department } = this.props;
    return (
      <div className="Profile">
        <span className="history-title">My Profile</span>
        <div className="Profile__Details">
            <Avatar size="200" round="8%" src={`http://localhost:3000/${imgUrl}`} value={firstName}/>
            <table className="profile-table">
            <tbody>
                <tr>
                  <td style={{'fontWeight': 'bold', 'width': '50px'}}>Name</td>
                  <td>{firstName + ' ' + lastName}</td>
                </tr>
                <tr>
                  <td style={{'fontWeight': 'bold'}}>Role</td>
                  <td>{title}</td>
                </tr>
                {department != null && <tr>
                  <td style={{'fontWeight': 'bold'}}>Team</td>
                  <td>{department}</td>
                </tr>}
              </tbody>
            </table>
        </div>
      </div>
    );
  }
}

export default Profile;
