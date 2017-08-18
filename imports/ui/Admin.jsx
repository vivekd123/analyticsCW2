import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';
import { Parallax } from 'react-parallax';
import Task from './Task.jsx';
import { jobs } from '../api/tasks.js';
import { apps } from '../api/tasks.js';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
const jobList = Meteor.subscribe('jobs');
const appsList = Meteor.subscribe('apps');
const userHandle = Meteor.subscribe('allUsers');
import moment from 'moment';
import { Calendar } from 'react-date-picker'
import { IndexLink, Link } from 'react-router';
import 'react-date-picker/index.css'

//import theme from './PurpleAppBar.scss';
import { Button, Grid, Row, Col, FormGroup, FieldGroup, ControlLabel, FormControl, HelpBlock, Table } from 'react-bootstrap';

// App component - represents the whole app
class Applications extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
      success: false,
      renderJobs: [],
      showApply: false,
      inputs: ['input-0'],
      movies: []
//        loading: true
    };
  }

    componentWillMount(){
        let dataURL = "http://api1.techiepulse.com/wp-json/wp/v2/posts?_embed";
//        let dataURL = "http://business.thaiembassyuk.org.uk/wp-json/wp/v2/posts?per_page=10";
        fetch(dataURL)
          .then(res => res.json())
          .then(res => {
            this.setState({
              movies: res
            }, function(){
//                Meteor.call('saveButtons', this.state.movies);
            })
            console.log(res)
          })
         this.renderJobs()
    }   
    
//    componentWillMount(){
////        let dataS = apps.find({}).fetch();
////        this.setState({ dataState: dataS })
//        
//    }
//    
//    componentDidMount(){
//        
//    }
    
  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
//     const name = this.state.appName
//      const email = this.state.appEmail
      const name = ReactDOM.findDOMNode(this.refs.name).value.trim();
      const job = ReactDOM.findDOMNode(this.refs.job).value.trim();
      const email = ReactDOM.findDOMNode(this.refs.email).value.trim();
      const position = ReactDOM.findDOMNode(this.refs.position).value.trim();
      
      Meteor.call('sendAppInterview', name, email, time, this.state.jobTitle);
      
      this.setState({
              success: true,
          })
        alert("Thankyou for applying!");
      
    
  }
    
    applyClick(post){
        console.log(post)
//        this.setState({
//            showApply: true,
//            jobTitle: post.job,
//            appName: post.name,
//            appEmail: post.email,
//            appCvLink: post.cvlink,
//            appMessage: post.message,
//        });
    }
    
    addClick(post){
        console.log(post)
        this.setState({
            showAdd: true,
            addType: post
        });
    }
    
    generateClick(post){
        
        this.setState({
            jobTitle: post.job,
            appName: post.name,
            appEmail: post.email,
            appCvLink: post.cvlink,
            appMessage: post.message,
            appId: post._id
        }, function () {
    this.deleteUser();
});
    }
    
    renderJobs(){
//        return(
//       console.log("Hello")
//            );
        let dataS = this.state.dataState;
//        console.log(dataS)
        var sidebar = [];
        var user = Meteor.users.find();           
        return user.map((post) => {
            if (post.online == true){
                sidebar.push(
                <tr key={post._id}>
                    <td>{post.profile.name}</td>
                    <td>{post.emails[0].address}</td>
                    <td>{post.profile.jobTitle}</td>
                    <td>{post.profile.speciality}</td>
                    <td><Button style={{backgroundColor:"#007ce6",color:"#fff"}}>Password Reset</Button>
                        <Button style={{backgroundColor:"#d00000",color:"#fff"}} onClick={() => this.generateClick(post)}>Delete User</Button></td>
                </tr>
            );
            }
        
//          return(
//               (sidebar)
//            ); 
            this.setState({
                renderJobs: sidebar
            })
        });
        
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
    
     appendInput() {
        var newInput = `input-${this.state.inputs.length}`;
        this.setState({ inputs: this.state.inputs.concat([newInput]) });
    }
    
    saveButtons(){
        Meteor.call('saveButtons', this.state.inputs);
    }
    
    loginTest(){
        Meteor.loginWithPassword("vivek@dhutia.com", "D960H")
    }
    
     createUser(){
        console.log("Create")
//        Accounts.createUser({
//            username: "testing",
//            password : "hello123",
//                            
//        });
//        let username = "Vivek Dhutia"
//        let email = "vdhutia18@gmail.com"
//        let password = "micron123"
//        
//        Accounts.createUser({email: email, username: username, password: password}, (err) => {
//      if(err){
//        this.setState({
//          error: err.reason
//        });
//      } else {
//        browserHistory.push('/login');
//      }
//    });
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 7; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        console.log(this.state.appEmail)
        console.log(text)
        var newUserData = {
          email: this.state.appEmail,
          password: text,
          profile: {
              name: this.state.appName,
              jobTitle: this.state.jobTitle,    
          }
        };
        Meteor.call('insertUser', newUserData);
        Meteor.call('sendAppGenerate', this.state.appName, this.state.appEmail, text);
         
         alert("Credentials Sent!");
    }
    
    deleteUser(){
      
        Meteor.call('deletetUser', this.state.appId);
         
         alert("User Deleted");
    }

  render() {    
      
       let movies = this.state.movies.map((movie, index) => {
      return <div key={index}>
          <div>{movie.id}</div>
          <Grid>
              <div className="card card-3"><Link to="/posts/what-is-bluetooth-5" activeClassName="active">
                        <div className="newsIMG">
                            <img src={movie._embedded['wp:featuredmedia'][0].source_url}/>
                            <h4>{movie.title.rendered}</h4>
                            <h3>27th April 2017</h3>
                            <div className="extra" dangerouslySetInnerHTML={ {__html: movie.excerpt.rendered} } />
                        </div>
                </Link></div>
                <Row className="show-grid postCont">
                    <Col xs={12} sm={8}>
                        
                        <h1 dangerouslySetInnerHTML={ {__html: movie.title.rendered} }></h1>
                        <div className="postText" dangerouslySetInnerHTML={ {__html: movie.content.rendered} } />
                        
                    </Col>
                    <Col xs={12} sm={4}>
                        
                    </Col>
                </Row>
            </Grid>
          
          {console.log(movie.id)}
      </div>
    });
    return (
      <div className="containerPar">
       {movies}
            <div>
               <form>
                   <div id="dynamicInput">
                       {this.state.inputs.map(input => <input type="text" name={input} key={input} />)}
                   </div>
               </form>
               <button onClick={ () => this.appendInput() }>
                   CLICK ME TO ADD AN INPUT
               </button>
                <button onClick={ () => this.saveButtons() }>SAVE</button>
            </div>
            
            <Grid>
                 <Row className="show-grid postCont">
                    <Col xs={12} sm={12}>
                       <h1>User Accounts Management</h1>
                        <Button style={{backgroundColor:"#27679d",color:"#fff"}} onClick={() => this.addClick("Paralegal")}>Add Paralegal</Button>
                        <Button style={{backgroundColor:"#27679d",color:"#fff"}} onClick={() => this.addClick("Head Paralegal")}>Add Head Paralegal</Button>
                        <Button style={{backgroundColor:"#27679d",color:"#fff"}} onClick={() => this.addClick("Barister")}>Add Barister</Button>
                    </Col>
                </Row>
                
                {this.state.showAdd ?
                    <form onSubmit={this.handleSubmit.bind(this)}>
                                <FormGroup
                                  controlId="formBasicText"
                                >
                                    <ControlLabel>Full Name*</ControlLabel>
                                  <FormControl
                                      ref="name"
                                    type="text"
                                    placeholder="James Smith"
                  
                                  />
                                                              
                                </FormGroup>
                        
                                <FormGroup
                                  controlId="formBasicText"
                                >
                                    <ControlLabel>Job Title*</ControlLabel>
                                  <FormControl
                                      ref="job"
                                    type="text"
                                    
                                      value={this.state.addType}
                                  />
                                                              
                                </FormGroup>
                                 
                                 <FormGroup
                                  controlId="formBasicText2"
                                >
                                    <ControlLabel>Contact Email*</ControlLabel>
                                  <FormControl
                                      ref="email"
                                    type="email"
                                    placeholder="name@email.com"
                                  />
                                                              
                                </FormGroup>
                                 
                                  <FormGroup
                                  controlId="formBasicText3"
                                >
                                    <ControlLabel>Position</ControlLabel>
                                  <FormControl
                                      ref="position"
                                    type="text"
                                    placeholder="Full Time/Part Time"
                                  />
                                                              
                                </FormGroup>
                                 
                                 
                                  <h4 style={{color:'#ff0000'}} ref="errorMes"></h4>
                                 
                                 <FormGroup>
                                    <Button style={{backgroundColor:"#153e72",color:"#fff"}} type="submit">
                                        Create
                                    </Button>
                                 </FormGroup>
                                 
                                 {this.state.success ? 
                                     <FormGroup>
                                  <FormControl.Static>
                                    User Successfully Added
                                  </FormControl.Static>
                                </FormGroup>
                                 : null }
                                 
                              </form>
                : null}
                
                <Row className="show-grid postCont">
                    <Col xs={12} sm={12}>
                       <h1>User Accounts</h1>
                        <Table striped bordered condensed hover>
                            <thead>
                              <tr>
                                
                                <th>Name</th>
                                <th>Email</th>
                                  <th>Job Title</th>
                                <th>Speciality</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                                {this.state.renderJobs}
                            </tbody>
                          </Table>
                       
                    </Col>
                    
                </Row>
               
                {this.state.showApply ?
                    <Row className="show-grid postCont">
                    <Col xs={12} sm={12}>
                       <h1>Interview - {this.state.jobTitle}</h1>
                        
                    </Col>
                    <Col xs={12} sm={6}>
                        <h2>{this.state.appName}</h2>  
                        <p>{this.state.appEmail}</p>
                        <p>{this.state.appCvLink}</p>
                        <p>{this.state.appMessage}</p>
                    </Col>
                    <Col xs={12} sm={6}>
                        
                        <form onSubmit={this.handleSubmit.bind(this)}>
                                    <FormGroup controlId="formControlsSelect">
                                      <ControlLabel>Interview Time</ControlLabel>
                                      <FormControl componentClass="select" placeholder="select" ref="timeSelect">
                                        <option value="09:00">09:00</option>
                                        <option value="10:00">10:00</option>
                                        <option value="11:00">11:00</option>
                                        <option value="12:00">12:00</option>
                                        <option value="other">...</option>
                                      </FormControl>
                                    </FormGroup>
                            
                            <Button style={{backgroundColor:"#153e72",color:"#fff"}} type="submit">
                                        Send Interview Request
                                    </Button>
                                 
                                 {this.state.success ? 
                                     <FormGroup>
                                  <FormControl.Static>
                                    Job Successfully Posted
                                  </FormControl.Static>
                                </FormGroup>
                                 : null }
                                 
                              </form>    
                    </Col>
                    
                </Row>
                : null}
                
            </Grid>
            
            <div>
                
            </div>
      </div>
    );
  }
}

Applications.propTypes = {
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
}, Applications);
