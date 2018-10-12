import React, { Component } from 'react';
import { Panel, ControlLabel, Glyphicon } from 'react-bootstrap';
import './Profile.css';

class Profile extends Component {

  constructor (props) {
    super(props);

    this.state = {
      profile: JSON.parse(localStorage.getItem('userProfile'))
    };

  }
  
  render() {
    
    return (
      <div> 
        <div className="container">
          <div className="profile-area">
            <h1>{this.state.profile.name}</h1>
            <Panel header="Profile">
              <img src={this.state.profile.picture} alt="profile" />
              <div>
                <ControlLabel><Glyphicon glyph="user" />Nickname</ControlLabel>
                <h3>{this.state.profile.nickname}</h3>
              </div>
              User Data
              <pre>{JSON.stringify(this.state.profile, null, 2)}</pre>
            </Panel>
          </div>
        </div>
      </div>
      
    );
  }
}

export default Profile;
