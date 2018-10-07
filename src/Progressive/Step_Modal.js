import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './progressive.css';
import { PROGRESSIVE_CONFIG } from './progressive-config';
import StepInfoDetails from './StepInfoDetails';
import Auth from '../Auth/Auth';

const auth = new Auth();

class StepModal extends Component {
    
    constructor(props) {
        super(props);
    
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: true,
            lastStep: this.props.step,
            StepInfo: PROGRESSIVE_CONFIG[this.props.step],
            userMetadata: this.props.userMetadata
        };
    }

    handleClose() {
    this.setState({ show: false });
    }

    handleShow() {
      this.setState({ show: true });
    }
  
    handleSubmit = (model) => {
                   console.log("Submit - Updated metadata: "+model);
                   var uData = JSON.parse(model);
                   
                   // Update Step
                   var newStep= uData.step+1;
                   uData.step = newStep;
                   
                   auth.patchUserMetadata(uData);
                   this.setState({ show: false });
    }
    

render () {
    
    
    return (
        
        <div>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.StepInfo.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
               <StepInfoDetails StepInfo={this.state.StepInfo} metadata={this.props.userMetadata} onSubmit={(model) => {this.handleSubmit(model)}} />
            
        </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
     
        
        
    )

}



}

export default StepModal;

