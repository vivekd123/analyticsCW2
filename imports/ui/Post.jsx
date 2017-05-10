import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';
import { Parallax } from 'react-parallax';
import Task from './Task.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

import renderHTML from 'react-render-html';
//import theme from './PurpleAppBar.scss';
import { Button, Grid, Row, Col } from 'react-bootstrap';

import {data} from './data.js'

// App component - represents the whole app
class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
      validPost: true,
      dataState: data,
      postTitle:"",
      postDate: "",
//        loading: true
    };
  }

//    componentDidMount(){
//        console.log("Mounted");
//        setTimeout(() => this.setState({ loading: false }), 1000);
//    }    
  componentWillMount(){
      let filteredData = this.state.dataState;
      filteredData = filteredData.filter(post => post.slug == this.props.params.title);
      this.setState({
          dataState: filteredData
      });
      if (filteredData.length == 0){
          console.log("notfound");
          browserHistory.replace('/not-found');
      }
      
      dataLayer.push({'vivek':this.props.params.title, 'event':'RunTask'})
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
    renderTitle(){
        var dataS = this.state.dataState;
         return dataS.map((post) => {                
          return(
               <h1 key={post.title}>{post.title}<span>{post.date}</span></h1>
            ); 
        });
    }
    
    renderImage(){
        var dataS = this.state.dataState;
         return dataS.map((post) => {                
          return(
              console.log(post.image),
               post.image
            ); 
        });
    }
    
    renderPost(){
        var dataS = this.state.dataState;
        var posts = [];
        return dataS.map((post) => {            
            for (var i = 0; i < post.post.length; i++){
                posts.push(
                    <div key={post.post[i].section}>
                    <h1>{post.post[i].title}</h1>
                    <div className="postText">{renderHTML(post.post[i].text)}</div>
                    </div>
                );
            }
            
          return(
               (posts)
            ); 
        });
    }
    
    renderSideBar(){
        var dataS = this.state.dataState;
        var sidebar = [];
        return dataS.map((post) => {
            
            for (var i = 0; i < post.sidebar.length; i++){
                if (post.sidebar[i].title !== "Author"){
                    sidebar.push(
                    <div key={post.sidebar[i].section}>
                    <h1>{post.sidebar[i].title}</h1>
                    <div className="postTextSpec">{renderHTML(post.sidebar[i].text)}</div>
                    </div>
                    );
                }else{
                    sidebar.push(
                    <div key={post.sidebar[i].section} className="cardAuthor card-3">
                            <div className="newsIMG2">
                                <img src="../profile2.jpg"/>
                                <h3>A U T H O R</h3>
                                <h4>{post.sidebar[i].text}</h4>
                                <div className="extra">Passionate about gadgets and all things tech</div>
                            </div>
                        </div>
                    );
                }
                
            }
            
          return(
               (sidebar)
            ); 
        });
    }

  render() {
const dummyText = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.';
    
    return (

      <div className="containerPar">
        <Parallax bgImage={this.renderImage()} strength={200}>
          <br/>
            <div className="parIn"></div>
          {this.renderTitle()}
           
        </Parallax>
            
            <Grid>
                <Row className="show-grid postCont">
                    <Col xs={12} sm={8}>
                        {this.renderPost()}
                    </Col>
                    <Col xs={12} sm={4}>
                        {this.renderSideBar()}
                    </Col>
                </Row>
            </Grid>
            
            <Grid>
                <Row className="show-grid">
                    <Col xs={12}><h1>RELATED ARTICLES</h1></Col>

                </Row>
            </Grid>
        
             <Grid>
                <Row className="show-grid">
                    
                </Row>
            </Grid>
            
            
            
            <div>
                
            </div>
      </div>
    );
  }
}

Post.propTypes = {
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
}, Post);
