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
      movies: [],
//        loading: true
    };
  }

//    componentDidMount(){
//        console.log("Mounted");
//        setTimeout(() => this.setState({ loading: false }), 1000);
//    }    
  componentWillMount(){
//      let filteredData = this.state.dataState;
//      filteredData = filteredData.filter(post => post.slug == this.props.params.title);
//      this.setState({
//          dataState: filteredData
//      });
//      if (filteredData.length == 0){
//          console.log("notfound");
//          browserHistory.replace('/not-found');
//      }
//      
//      dataLayer.push({'vivek':this.props.params.title, 'event':'RunTask'})

      var urlNew = "http://api1.techiepulse.com/wp-json/wp/v2/posts?slug=" + this.props.params.title + "&_embed"
      let dataURL = urlNew;
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
       var moment = require('moment');
      var authorArray = []
      var sidebarArray = []
      let movies = this.state.movies.map((movie, index) => {
          var date = moment(movie.date).format('LL')
          var date2 = moment(movie.date).fromNow();
          if(movie.acf != false){
              sidebarArray.push(<div key={movie.id}>
                    <h1>{movie.acf.sidebar_title}</h1>
                    <div className="postTextSpec">{renderHTML(movie.acf.sidebar_text)}</div>
                    </div>)
          }
          if(movie._embedded['author'][0].slug == "vivek"){
              authorArray.push(
            <div key={movie.id} className="cardAuthor card-3">
                            <div className="newsIMG2">
                                <img src="../profileViv.jpg"/>
                                <h3>A U T H O R</h3>
                                <h4>Vivek Dhutia</h4>
                                <div className="extra">Passionate about gadgets and all things tech</div>
                            </div>
                        </div>)
      }else{
          authorArray.push(
        <div key={movie.id} className="cardAuthor card-3">
                <div className="newsIMG2">
                    <img src="../profiletony.jpg"/>
                    <h3>A U T H O R</h3>
                    <h4>Hariras Tongyai</h4>
                    <div className="extra">Passionate about gadgets and all things tech</div>
                </div>
            </div>)
      }
      return <div key={index}>
          <Parallax bgImage={movie._embedded['wp:featuredmedia'][0].source_url} strength={300} bgwidth={'100%'}>
          <br/>
            <div className="parIn"></div>
              <h1 style={{display:"inline-block"}} key={movie.title.rendered} dangerouslySetInnerHTML={ {__html: movie.title.rendered}}/><h4 className="postDate" style={{display:"inline-block"}} dangerouslySetInnerHTML={ {__html: date2}}></h4>
           
          </Parallax>
          <Grid>
                <Row className="show-grid postCont">
                    <Col xs={12} sm={8}>
                        
                        
                        <div className="postText" dangerouslySetInnerHTML={ {__html: movie.content.rendered} } />
                        
                    </Col>
                    <Col xs={12} sm={4}>
                        {sidebarArray}
                        {authorArray}
                    </Col>
                </Row>
         </Grid>
      </div>
    });

    return (

      <div className="containerPar">
        {movies}
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
