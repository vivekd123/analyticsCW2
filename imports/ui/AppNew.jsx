import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
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
        <Parallax bgImage="home2.jpg" strength={200}>
          <br/>
            <div className="parIn"></div>
          <h1>TRENDING ON TECHIE PULSE</h1>
           
        </Parallax>
            
            <Grid>
                <Row className="show-grid">
                    <Col xs={12} sm={6}>
                        <ReactCSSTransitionGroup
                              transitionName="example"
                              transitionAppear={true}
                              transitionAppearTimeout={500}
                              transitionEnter={false}
                              transitionLeave={false}>
                                 <div className="card card-3"><Link to="/posts/what-is-bluetooth-5" activeClassName="active">
                        <div className="newsIMG">
                            
                              <img src="bluetooth4.jpg"/>
                            <h4>What is Bluetooth 5?</h4>
                            <h3>27th April 2017</h3>
                            <div className="extra">The latest and greatest in bluetooth technology</div>
                        </div>
                </Link></div>
                            </ReactCSSTransitionGroup>
                    </Col>
                    <Col xs={12} sm={6}>
                        <div className="card card-3"><Link to="/posts/gold-iphone" activeClassName="active">
                        <div className="newsIMG">
                            <img src="gold.jpg"/>
                            <h4>Gold Plated iPhone 7</h4>
                            <h3>26th April 2017</h3>
                            <div className="extra">A custom gold plated iPhone 7...</div>
                        </div>
                        </Link></div>
                    </Col>
                </Row>
            </Grid>
            
          <Grid>
                <Row className="show-grid">
                    <Col xs={12} sm={12}>
                        <div className="card card-3">
                            <Link to="/posts/light-phone" activeClassName="active">
                        <div className="newsIMG">
                            <img src="light.jpg"/>
                            <h4>The Light Phone</h4>
                            <h3>20th April 2017</h3>
                            <div className="extra">Minimalist Mobile Phone</div>
                        </div>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Grid>
            
             <Grid>
                <Row className="show-grid">
                    <Col xs={12} sm={12}>
                        <div className="card card-3">
                            <Link to="/posts/oneplus-midnight-black" activeClassName="active">
                        <div className="newsIMG">
                            <img src="oneplus.jpg"/>
                            <h4>One Plus 3T Midnight Black Limited Edition</h4>
                            <h3>19th April 2017</h3>
                            <div className="extra">The Flagship Killer</div>
                        </div>
                            </Link>
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
