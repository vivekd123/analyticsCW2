import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { IndexLink, Link } from 'react-router';

//import { Navigation } from '../components/navigation.jsx';

class App2 extends Component{
    
 constructor(props) {
    super(props);

    this.state = {
        loading: true
    };
  }
    
    componentDidMount(){
        console.log("Mounted");
        setTimeout(() => this.setState({ loading: false }), 1500);
    } 
    
    
    render(){
        const { loading } = this.state;      
    if(loading) {
      return( 
        <div>
            <CSSTransitionGroup
         transitionName="example2"
    transitionEnter={false}
      transitionLeaveTimeout={2000}>
                
          <div className="loaderBack">
              
              <div className="container">
  <div className="circle-container">
    <div className="circle"></div>
  </div>
  <div className="circle-container">
    <div className="circle"></div>
  </div>
  <div className="circle-container">
    <div className="circle"></div>
  </div>
</div>
              <div className="loadingTitle">
                <h1>Loading</h1>
              </div>
                
                </div>
        </CSSTransitionGroup>   
      </div>
       );
    }
    
    return (
    <div>
            <section className="navBar">
        
            <ul>
    <li><h1>TECHIE PULSE</h1></li>
    <li style={{float:"right"}}><Link to="/app1" activeClassName="active">About</Link></li>
    <li style={{float:"right"}}><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
    
  </ul>
   </section>
    
            <CSSTransitionGroup
         transitionName="example"
      transitionAppear={true}
      transitionAppearTimeout={500}
      transitionEnter={false}
      transitionLeave={false}>
          <div className="enterAnim">
            {this.props.children}
          </div>
        </CSSTransitionGroup>      
    </div>
      
    );
    }
    
}

//export const App2 = ( { children } ) => (
//  <div>
//   <section className="navBar">
//        <h1>Techie Life</h1>
//    </section>
//    <ul>
//    <li><IndexLink to="/" activeClassName="active">Index</IndexLink></li>
//    <li><Link to="/app1" activeClassName="active">Page One</Link></li>
//  </ul>
//    { children }
//  </div>
//)

export default App2;