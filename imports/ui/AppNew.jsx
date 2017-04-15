import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';
import { Parallax } from 'react-parallax';
import Task from './Task.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

import { IndexLink, Link } from 'react-router';
//import theme from './PurpleAppBar.scss';
import { Button, Grid, Row, Col } from 'react-bootstrap';


// App component - represents the whole app
class AppNew extends Component {
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
        <Parallax bgImage="cover.jpg" strength={400}>
          <br/>
            <div className="parIn"></div>
          <h1>TRENDING ON TECHIE PULSE</h1>
           
        </Parallax>
            
            <Grid>
                <Row className="show-grid">
                    <Col xs={12} sm={6}>
                        <div className="card card-3"><a href="#">
                        <div className="newsIMG">
                              <img src="2card.jpg"/>
                            <h4>Samsung S8 Fail?</h4>
                            <h3>10th April 2017</h3>
                            <div className="extra">Samsung launched the new...</div>
                        </div>
                </a></div>
                    </Col>
                    <Col xs={12} sm={6}>
                        <div className="card card-3"><a href="#">
                        <div className="newsIMG">
                            <img src="3card.jpg"/>
                            <h4>Samsung S8 Fail?</h4>
                            <h3>10th April 2017</h3>
                            <div className="extra">Samsung launched the new...</div>
                        </div>
                        </a></div>
                    </Col>
                </Row>
            </Grid>
            
          <Grid>
                <Row className="show-grid">
                    <Col xs={12} sm={12}>
                        <div className="card card-3">
                            <Link to="/posts/samsung" activeClassName="active">
                        <div className="newsIMG">
                            <img src="1test.jpg"/>
                            <h4>Samsung S8 Camera Test</h4>
                            <h3>10th April 2017</h3>
                            <div className="extra">Samsung launched the new...</div>
                        </div>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Grid>
            
             <Grid>
                <Row className="show-grid">
                    <Col xs={12} sm={4}>
                        <div className="card card-3"><a href="#">
                        <div className="newsIMG">
                            <img src="2card.jpg"/>
                            <h4>Samsung S8 Fail?</h4>
                            <h3>10th April 2017</h3>
                            <div className="extra">Samsung launched the new...</div>
                        </div>
                </a></div>
                    </Col>
                    <Col xs={12} sm={4}>
                        <div className="card card-3"><a href="#">
                        <div className="newsIMG">
                            <img src="3card.jpg"/>
                            <h4>Samsung S8 Fail?</h4>
                            <h3>10th April 2017</h3>
                            <div className="extra">Samsung launched the new...</div>
                        </div>
                </a></div>
                    </Col>
                    <Col xs={12} sm={4}>
                        <div className="card card-3"><a href="#">
                        <div className="newsIMG">
                            <img src="3card.jpg"/>
                            <h4>Samsung S8 Fail?</h4>
                            <h3>10th April 2017</h3>
                            <div className="extra">Samsung launched the new...</div>
                        </div>
                </a></div>
                    </Col>
                </Row>
            </Grid>
            
            
            
            <div>
                
            </div>
      </div>
    );
  }
}

AppNew.propTypes = {
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
}, AppNew);
