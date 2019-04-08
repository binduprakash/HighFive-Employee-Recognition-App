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
            <Avatar size="200" round={10} src={`http://localhost:3000/${imgUrl}`} value={firstName}/>
            <table className="profile-table">
              <tr>
                <td style={{'font-weight': 'bold', 'width': '50px'}}>Name</td>
                <td>{firstName + ' ' + lastName}</td>
              </tr>
              <tr>
                <td style={{'font-weight': 'bold'}}>Role</td>
                <td>{title}</td>
              </tr>
              {department != null && <tr>
                <td style={{'font-weight': 'bold'}}>Team</td>
                <td>{department}</td>
              </tr>}
            </table>
        </div>
      </div>
    );
  }
}

export default Profile;
