import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';
import { Parallax } from 'react-parallax';
import Task from './Task.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

//import theme from './PurpleAppBar.scss';
import { Button, Grid, Row, Col } from 'react-bootstrap';

// App component - represents the whole app
class About extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
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
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Meteor.call('tasks.insert', text);

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  renderTasks() {
    let filteredTasks = this.props.tasks;
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }
    return filteredTasks.map((task) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = task.owner === currentUserId;

      return (
        <Task
          key={task._id}
          task={task}
          showPrivateButton={showPrivateButton}
        />
      );
    });
  }

  render() {
const dummyText = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.';
    
    return (
      <div className="containerPar">
        <Parallax bgImage="../about2.jpg" strength={400}>
          <br/>
            <div className="parIn"></div>
          <h1>Our Story (About)</h1>
           
        </Parallax>
            
            <Grid>
                <Row className="show-grid postCont">
                    <Col xs={12} sm={8}>
                       <h1>TECHIE</h1>
                        <div className="postText">
                            <p>In 2014 we started the Techie Life youtube channel to share our passion of technology with the world.</p>
                            <p>The channel was born when the three of us were in a cafe, talking about technology and thought we should share our discussions and views to the world. We also decided to discuss on the show, recent tech events like apple's keynotes, as well as provide a brief explanations of the released hardware or software.</p>
                            <p>We got so busy with our University projects and assignments that we didn't have enough time to maintain the youtube channel. This is when we decided to form Techie Pulse blog website.</p>
                            <p>We hope that through Techie Pulse we can share the same quality of content as we did on the youtube channel.</p>
                            
                        </div>
                        
                    </Col>
                    <Col xs={12} sm={4}>
                            <h1>THE TEAM</h1>
        
                        <div className="cardAuthor card-3">
                            
                            <div className="newsIMG2">
                                <img src="../profileViv.jpg"/>
                                
                                <h4>Vivek Dhutia</h4>
                                <div className="extra">Passionate about gadgets and all things tech</div>
                            </div>
                        </div>
                
                
                        <div className="cardAuthor card-3">
                            
                            <div className="newsIMG2">
                                <img src="../profiletony.jpg"/>
                                
                                <h4>Hariras Tongyai</h4>
                                <div className="extra"></div>
                            </div>
                        </div>
                        
                        <div className="cardAuthor card-3">
                            
                            <div className="newsIMG2">
                                <img src="../profilekemal.jpg"/>
                                
                                <h4>Kemal Kole</h4>
                                <div className="extra"></div>
                            </div>
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

About.propTypes = {
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
}, About);
