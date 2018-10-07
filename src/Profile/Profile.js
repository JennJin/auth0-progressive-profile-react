import React, { Component } from 'react';
import { Panel, ControlLabel, Glyphicon } from 'react-bootstrap';
import './Profile.css';
import Progressive from '../Progressive/progressive';
import StepModal from '../Progressive/Step_Modal';

class Profile extends Component {
  
  
  render() {

    let userProfile = localStorage.getItem('userProfile');
    let userMetadata = localStorage.getItem('userMetadata');
    
    let profile = JSON.parse(userProfile);
    
    var pMeta = JSON.parse(userMetadata);
    console.log("step: "+pMeta.step);
    console.log("User Profile: "+userProfile);
    console.log("userMetadata: "+userMetadata);
    
    let userInfo;
    let modal;
    
    // Check to see if Steps are complete
    if (pMeta.step < pMeta.totalSteps) {
      modal = <StepModal step={pMeta.step} userMetadata={userMetadata}/>;
    } else {
      userInfo = <Progressive userMetadata={userMetadata}/>;
    }
  
    return (
    <div>
    {userInfo}
        <div>
          {modal}
        </div>
      <div className="container">
        <div className="profile-area">
          <h1>{profile.name}</h1>
          <Panel header="Profile">
            <img src={profile.picture} alt="profile" />
            <div>
              <ControlLabel><Glyphicon glyph="user" />Nickname</ControlLabel>
              <h3>{profile.nickname}</h3>
            </div>
            User Data
            <pre>{JSON.stringify(profile, null, 2)}</pre>
          </Panel>
        </div>
      </div>
    </div>
      
    );
  }
}

export default Profile;
