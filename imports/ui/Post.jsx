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
class Post extends Component {
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
        <Parallax bgImage="../galaxy-s8.jpg" strength={400}>
          <br/>
            <div className="parIn"></div>
          <h1>Samsung S8</h1>
           
        </Parallax>
            
            <Grid>
                <Row className="show-grid postCont">
                    <Col xs={12} sm={8}>
                       <h1>INITIAL IMPRESSIONS</h1>
                        <div className="postText">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ullamcorper nisl id massa vulputate posuere. Ut eget sagittis nunc. Quisque eleifend metus ac tristique pharetra. Nunc urna lectus, egestas et purus eget, hendrerit varius mi. Mauris posuere arcu massa, in blandit enim ultrices nec. Cras eu eros justo. In tempor imperdiet lectus, ut sodales ante porta quis. Mauris euismod, dui ullamcorper facilisis dignissim, arcu diam consectetur elit, vitae convallis augue lorem sodales ante. Nullam in massa imperdiet, dapibus ex non, venenatis felis. Aliquam sit amet luctus nibh. Phasellus tincidunt porttitor elementum. Morbi enim magna, mollis quis velit in, eleifend aliquam libero. Donec eu ante urna. Maecenas viverra ipsum libero, sed placerat nulla porttitor in.</p>
                            <p>Nullam volutpat, ante vel cursus varius, velit orci auctor nibh, sit amet viverra sapien nulla et turpis. Donec aliquam id eros a egestas. Nunc purus sapien, auctor eu pharetra dignissim, convallis id nibh. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec at libero varius, pellentesque erat at, luctus felis. Donec interdum, augue id malesuada faucibus, lectus sapien rhoncus eros, at lacinia dui ex id urna. Sed in blandit erat. Nullam vel congue leo. Proin maximus laoreet mi non placerat. Aliquam nisi lectus, consectetur sit amet massa pulvinar, suscipit porta orci. Morbi fringilla felis ut quam tristique, a viverra urna malesuada. Ut non odio pulvinar, dignissim eros eget, pharetra lorem. Suspendisse sit amet egestas mauris.</p>
                        </div>
                        <h1>REVIEW</h1>
                        <div className="postText">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ullamcorper nisl id massa vulputate posuere. Ut eget sagittis nunc. Quisque eleifend metus ac tristique pharetra. Nunc urna lectus, egestas et purus eget, hendrerit varius mi. Mauris posuere arcu massa, in blandit enim ultrices nec. Cras eu eros justo. In tempor imperdiet lectus, ut sodales ante porta quis. Mauris euismod, dui ullamcorper facilisis dignissim, arcu diam consectetur elit, vitae convallis augue lorem sodales ante. Nullam in massa imperdiet, dapibus ex non, venenatis felis. Aliquam sit amet luctus nibh. Phasellus tincidunt porttitor elementum. Morbi enim magna, mollis quis velit in, eleifend aliquam libero. Donec eu ante urna. Maecenas viverra ipsum libero, sed placerat nulla porttitor in.</p>
                            <p>Nullam volutpat, ante vel cursus varius, velit orci auctor nibh, sit amet viverra sapien nulla et turpis. Donec aliquam id eros a egestas. Nunc purus sapien, auctor eu pharetra dignissim, convallis id nibh. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec at libero varius, pellentesque erat at, luctus felis. Donec interdum, augue id malesuada faucibus, lectus sapien rhoncus eros, at lacinia dui ex id urna. Sed in blandit erat. Nullam vel congue leo. Proin maximus laoreet mi non placerat. Aliquam nisi lectus, consectetur sit amet massa pulvinar, suscipit porta orci. Morbi fringilla felis ut quam tristique, a viverra urna malesuada. Ut non odio pulvinar, dignissim eros eget, pharetra lorem. Suspendisse sit amet egestas mauris.</p>
                        </div>
                    </Col>
                    <Col xs={12} sm={4}>
                            <h1>SPECIFICATIONS</h1>
        
                        <div className="postTextSpec">
                            <ul>
                                <li>Manufacturer: Samsung Electronics LTD.</li>
                                <li>Screen Size: 5.8inch Curved</li>
                                <li>Processor: Exynos 88778</li>
                                <li>Memory (Ram): 4GB</li>
                            </ul>
                        </div>
                        
                         <h1>SOURCES</h1>
                        <div className="postTextSpec">
                            <ul>
                                <li>Manufacturer: Samsung Electronics LTD.</li>
                                <li>Screen Size: 5.8inch Curved</li>
                                <li>Processor: Exynos 88778</li>
                                <li>Memory (Ram): 4GB</li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </Grid>
            
            <Grid>
                <Row className="show-grid">
                    <Col xs={12}><h1>RELATED ARTICLES</h1></Col>
                    <Col xs={12} sm={4}>
                        <div className="card card-3"><a href="#">
                        <div className="newsIMG">
                            <img src="../2.jpg"/>
                            <h4>Samsung S8 Fail?</h4>
                            <h3>10th April 2017</h3>
                            <div className="extra">Samsung launched the new...</div>
                        </div>
                </a></div>
                    </Col>
                    <Col xs={12} sm={4}>
                        <div className="card card-3"><a href="#">
                        <div className="newsIMG">
                            <img src="../3.jpg"/>
                            <h4>Samsung S8 Fail?</h4>
                            <h3>10th April 2017</h3>
                            <div className="extra">Samsung launched the new...</div>
                        </div>
                </a></div>
                    </Col>
                     <Col xs={12} sm={4}>
                        <div className="card card-3"><a href="#">
                        <div className="newsIMG">
                            <img src="../3.jpg"/>
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
                    <Col xs={12} sm={6}>
                        <div className="card card-3"><a href="#">
                        <div className="newsIMG">
                            <img src="../2.jpg"/>
                            <h4>Samsung S8 Fail?</h4>
                            <h3>10th April 2017</h3>
                            <div className="extra">Samsung launched the new...</div>
                        </div>
                </a></div>
                    </Col>
                    <Col xs={12} sm={6}>
                        <div className="card card-3"><a href="#">
                        <div className="newsIMG">
                            <img src="../3.jpg"/>
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
