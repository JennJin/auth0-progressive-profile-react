import React, { Component } from 'react';

class Progressive extends Component {
        
      
        
        render () {
                
                let uData = this.props.userMetadata;                
                
                return (
                <div className="container">
                        <div className="row">
                          <div className="col s12 board">
                                 {uData}
                          </div>
                        </div>
              </div>
                )
        }
}

export default Progressive;