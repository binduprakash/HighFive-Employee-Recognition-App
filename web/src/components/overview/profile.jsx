import React, { Component } from 'react';

class Profile extends Component {
  render() {
      const profile = {
          img_url: 'https://randomuser.me/api/portraits/men/36.jpg',
          name: 'Tyler McFlurry',
          role: 'Senior Engineer',
          team: 'Engineering'
      }
    return (
      <div className="Profile">
        <h3>My Profile</h3>
        <div className="Profile__Details">
            <img src={profile.img_url} alt={profile.name} />
            <p>Name: {profile.name}</p>
            <p>Role: {profile.role}</p>
            <p>Team: {profile.team}</p>
        </div>
      </div>
    );
  }
}

export default Profile;
