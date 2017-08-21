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
      movies: [],
//        loading: true
    };
  }

//    componentDidMount(){
//        console.log("Mounted");
//        setTimeout(() => this.setState({ loading: false }), 1000);
//    }   
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
          })
    }   
    
    
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
      var moment = require('moment');
      var now = moment();
      let movies = this.state.movies.map((movie, index) => {
      if(now.diff(movie.date, 'days') > 7){
          var date = moment(movie.date).format('LL')
      }else{
          var date = moment(movie.date).fromNow();
      }  
      var postLink = "/posts/" + movie.slug
      return <div key={index}>
          
            <Col xs={12} sm={6}>
                  <div className="card card-3">
                      <Link to={postLink} activeClassName="active">
                            <div className="newsIMG">
                                <img src={movie._embedded['wp:featuredmedia'][0].source_url}/>
                                <h4>{movie.title.rendered}</h4>
                                <h3>{date}</h3>
                                <div className="extra" dangerouslySetInnerHTML={ {__html: movie.excerpt.rendered} } />
                            </div>
                      </Link>
                   </div>
          </Col>
      </div>
    });

    return (
      <div className="containerPar">
        <Parallax bgImage="home2.jpg" strength={200}>
          <br/>
            <div className="parIn"></div>
          <h1>TRENDING ON TECHIE PULSE</h1>
           
        </Parallax>
            
           
            
            <Grid>
            <Row className="show-grid">
                   {movies}
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
