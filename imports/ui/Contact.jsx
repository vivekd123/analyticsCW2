import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';
import { Parallax } from 'react-parallax';
import Task from './Task.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

//import theme from './PurpleAppBar.scss';
import { Button, Grid, Row, Col, FormGroup, FieldGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

// App component - represents the whole app
class Contact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
      success: false,
//        loading: true
    };
  }

//    componentDidMount(){
//        console.log("Mounted");
//        setTimeout(() => this.setState({ loading: false }), 1000);
//    }    
    
  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
     const name = ReactDOM.findDOMNode(this.refs.name).value.trim();
      const email = ReactDOM.findDOMNode(this.refs.email).value.trim();
      const subject = ReactDOM.findDOMNode(this.refs.subject).value.trim();
      const message = ReactDOM.findDOMNode(this.refs.message).value.trim();
      
      if (name.length > 4){
            if (message.length > 0){
            var validator = require('validator');
            var newVal = validator.isEmail(email); //=> true 
                if (email.length > 0 && newVal){
                        
                           Meteor.call('sendMessage', name, email, subject, message);
                         // Clear form
                           ReactDOM.findDOMNode(this.refs.name).value = "";
                           ReactDOM.findDOMNode(this.refs.email).value = "";
                           ReactDOM.findDOMNode(this.refs.subject).value = "";
                           ReactDOM.findDOMNode(this.refs.message).value = "";
                           ReactDOM.findDOMNode(this.refs.errorMes).innerHTML = "";
                          this.setState({
                              success: true,
                          })
                        alert("Thankyou for contacting us!");
                }else{
                         ReactDOM.findDOMNode(this.refs.errorMes).innerHTML = "Please enter a valid email address";                    
                }
                
            }else{
                ReactDOM.findDOMNode(this.refs.errorMes).innerHTML = "Please enter a message";
            }
        }else{
            ReactDOM.findDOMNode(this.refs.errorMes).innerHTML = 'Please enter your name';
        }

    
  }
    

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  submitForm(){
     
    const email = ReactDOM.findDOMNode(this.refs.email).value.trim();
    const phone = ReactDOM.findDOMNode(this.refs.phone).value.trim();
  }

  render() {
const dummyText = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.';
    
    return (
      <div className="containerPar">
        <Parallax bgImage="../contact3.jpg" strength={200}>
          <br/>
            <div className="parIn"></div>
          <h1>Contact</h1>
           
        </Parallax>
            
            <Grid>
                <Row className="show-grid postCont">
                    <Col xs={12} sm={8}>
                       <h1>Email Form</h1>
                        <div className="postText">
                             <form onSubmit={this.handleSubmit.bind(this)}>
                                <FormGroup
                                  controlId="formBasicText"
                                >
                                    <ControlLabel>Name*</ControlLabel>
                                  <FormControl
                                      ref="name"
                                    type="text"
                                    placeholder="James Smith"
                                  />
                                                              
                                </FormGroup>
                                 
                                 <FormGroup
                                  controlId="formBasicText2"
                                >
                                    <ControlLabel>Email*</ControlLabel>
                                  <FormControl
                                      ref="email"
                                    type="email"
                                    placeholder="name@email.com"
                                  />
                                                              
                                </FormGroup>
                                 
                                  <FormGroup
                                  controlId="formBasicText3"
                                >
                                    <ControlLabel>Subject</ControlLabel>
                                  <FormControl
                                      ref="subject"
                                    type="text"
                                    placeholder="Subject"
                                  />
                                                              
                                </FormGroup>
                                 
                                  <FormGroup controlId="formControlsTextarea">
                                  <ControlLabel>Message*</ControlLabel>
                                  <FormControl ref="message" componentClass="textarea" placeholder="Message" />
                                </FormGroup>
                                 
                                  <h4 style={{color:'#ff0000'}} ref="errorMes"></h4>
                                 
                                 <FormGroup>
                                    <Button style={{backgroundColor:"#153e72",color:"#fff"}} type="submit">
                                        Send
                                    </Button>
                                 </FormGroup>
                                 
                                 {this.state.success ? 
                                     <FormGroup>
                                  <FormControl.Static>
                                    Message Successfully Sent
                                  </FormControl.Static>
                                </FormGroup>
                                 : null }
                                 
                              </form>
                        </div>
                       
                    </Col>
                    <Col xs={12} sm={4}>
                            <h1>Contact Details</h1>
        
                        <div className="postTextSpec">
                            <ul>
                                <li>Email: info@techiepulse.com</li>
                            </ul>
                        </div>
                        
                        <h1>Location</h1>
        
                        <div className="postTextSpec">
                            <ul>
                                <li>London, UK</li>
                            </ul>
                        </div>
                        
                         
                    </Col>
                </Row>
            </Grid>
            
            <div>
                
            </div>
      </div>
    );
  }
}

Contact.propTypes = {
  tasks: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
  currentUser: PropTypes.object,
};

export default createContainer(() => {
  Meteor.subscribe('tasks');

  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
  };
}, Contact);
