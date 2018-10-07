import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import './progressive.css';


class StepInfoDetails extends Component  {
        state = {};
        constructor(props) {
                super(props);
                
                this.state = {
                        show: true,
                        metadata: this.props.metadata
                };

                this.handleSkip = this.handleSkip.bind(this);
        }
        
        onChange = (e, key,type="single") => {
                
                var metadata = JSON.parse(this.state.metadata);
                console.log ("meta: "+JSON.stringify(metadata));
                
                console.log(`${key} changed ${e.target.value} type ${type}`);
               if (type === "single") {
                        metadata[key]= e.target.value  
                   this.setState(
                           {metadata: JSON.stringify(metadata)}
                       );
               } else {
                   // Array of values (e.g. checkbox): TODO: Optimization needed.
                   let found = metadata[key] ?  
                                   metadata[key].find ((d) => d === e.target.value) : false;
                   
                   if (found) {
                       let data = metadata[key].filter((d) => {
                           return d !== found;
                       });
                       metadata[key] = data; 
                       this.setState(
                           {metadata: JSON.stringify(metadata)}
                       );
                   } else {
                        metadata[key].push(e.target.value);
                       this.setState(
                            {metadata: JSON.stringify(metadata)}
                       );
                   }
               }
           }
            
                
        
        handleSubmit = (e) => {
               e.preventDefault();
                if (this.props.onSubmit) this.props.onSubmit(this.state.metadata);
        }
  
        handleSkip() {
                
                var data = JSON.parse(this.state.metadata);
                
                for (var i=0; i < this.props.StepInfo.questions.length; i++ ){
                        var key = this.props.StepInfo.questions[i].key;
                        data[key] = "skip";
                }
                
                console.log("Skip: "+JSON.stringify(data));
                this.props.onSubmit(JSON.stringify(data));
        }
        
       
        renderForm = () => {
        let model = this.props.StepInfo.questions;
        
        let formUI = model.map((m) => {
            let key = m.key;
            let type = m.type;
            let props = m.props || {};
            let name= m.name;
            let value = m.value;
            
            let target = key;  
                
            let input = <input {...props}
                    className="form-input"
                    type={type}
                    key={key}
                    name={name}
                    value={value}
                    onChange={(e)=>{this.onChange(e, target)}}
                />;

            if (type === "radio") {
               input = m.options.map((o) => {
                   let checked = o.value === value;
                    return (
                        <React.Fragment key={'fr' + o.key}>
                        
                        <div className="radio">
                                <label key={"ll" +o.key }>
                            <input {...props}
                                    className="form-input"
                                    type={type}
                                    key={o.key}
                                    name={o.name}
                                    checked={checked}
                                    value={o.value}
                                    onChange={(e)=>{this.onChange(e, o.name)}}
                            />
                            {o.label}</label>
                            </div>
                        </React.Fragment>
                    );
               });
               input = <div className="form-group-radio">{input}</div>;
               }
            
            
            if (type === "select") {
                input = m.options.map((o) => {
                    console.log("select: ", o.value, value);
                     return (
                            <option {...props}
                                className="form-input"
                                key={o.key}
                                value={o.value}
                            >{o.value}</option>
                     );
                });

                //console.log("Select default: ", value);
                input = <select className="form-control" value={value} onChange={(e)=>{this.onChange(e, m.key)}}>{input}</select>;
             
             }
            

             if (type === "checkbox") {
                input = m.options.map((o) => {
                    
                    //console.log("Checkbox: ",checked);
                     return (
                        <React.Fragment key={"cfr" + o.key}>
                        
                        <div className="checkbox">
                            <label key={"ll" +o.key }>
                            <input {...props}
                                className="form-input"
                                type={type}
                                key={o.key}
                                name={o.name}
                                value={o.value}
                                onChange={(e)=>{this.onChange(e, m.key,"multiple")}}
                            />
                            {o.label}</label>
                            </div>

                        </React.Fragment>
                     );
                });

                input = <div className="form-group-checkbox">{input}</div>;

             }
        
            
            return (
                <div key={'g' + key} className="form-group">
                <div className="">
                    <label className="form-label"
                        key={"l" + key}
                        htmlFor={key}>
                        {m.label}
                    </label>
                   
                    {input}
                     </div>
                </div>
            );
        });
        return formUI;
            }
    
        
        
        render () {
                console.log("State: "+this.state.metadata);

                return (
                        
                <div className="row">
                        <div className="container-fluid">
                        <div className="row">
                                <Form className="form-horizontal">
                                 {this.renderForm()}
                                </Form>
                        </div>
                        <div className="row">
                        <div className="container-fluid text-center">
                                <div className="center-block">
                                <Button id="submit" bsStyle="primary" bsSize="small" onClick={(e)=>{this.handleSubmit(e)}}>
                                Submit
                                </Button>
                                </div>
                                <div className="center-block">
                                <Button id="skip" bsStyle="link" bsSize="small" onClick={this.handleSkip}>
                                skip
                                </Button>
                                </div>
                        </div>
                        </div>
                        </div>
                </div>
                );

        }
}
export default StepInfoDetails;