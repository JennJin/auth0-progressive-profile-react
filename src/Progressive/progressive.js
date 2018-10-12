import React, { Component } from 'react';
import StepModal from '../Progressive/Step_Modal';

class Progressive extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      newSession: JSON.parse(localStorage.getItem('newSession')),
      userMetadata: JSON.parse(localStorage.getItem('userMetadata'))
    };
  }

  render () {

    var modal;

    if (this.state.newSession) {
      //console.log("is new session");
      if (this.state.userMetadata) {
        //console.log("has metadata");
        if (this.state.userMetadata.step < this.state.userMetadata.totalSteps) {
          modal = <StepModal step={this.state.userMetadata.step} userMetadata={this.state.userMetadata}/>;
        }
        localStorage.setItem('newSession', false);
      } else {
        //console.log("no metadata");
        this.props.auth.getUserData();
        window.location.reload(); 
      }
    }

    return (
      <div>
        {modal}
      </div>
    )
  }
}

export default Progressive;