import React, { Component } from 'react';


class Profile extends Component {
  render() {
    const { firstName, lastName, imgUrl, title, department } = this.props;
    return (
      <div className="Profile">
        <h3>My Profile</h3>
        <div className="Profile__Details">
            <img src={`http://localhost:3000/${imgUrl}`} alt={firstName} className="profile-avatar" />
            <p>Name: {firstName + ' ' + lastName}</p>
            <p>Role: {title}</p>
            <p>Team: {department}</p>
        </div>
      </div>
    );
  }
}

export default Profile;
