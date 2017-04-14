import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { IndexLink, Link } from 'react-router';

import { Button, Grid, Row, Col } from 'react-bootstrap';

import FaBeer from 'react-icons/lib/fa/search';
import FaFB from 'react-icons/lib/fa/facebook';
import FaTW from 'react-icons/lib/fa/twitter';
import FaIN from 'react-icons/lib/fa/instagram';
import FaBar from 'react-icons/lib/fa/bars';
import FaEmail from 'react-icons/lib/fa/envelope';
//import { Navigation } from '../components/navigation.jsx';

class App2 extends Component{
    
 constructor(props) {
    super(props);

    this.state = {
        loading: true,
        condition: false,
        search: false,
    };
     
  }
        
    componentDidMount(){
        setTimeout(() => this.setState({ loading: false }), 800);
//        Meteor.call('sendEmail', "date", "hello");
    } 
    
    componentDidUpdate() {
  window.scrollTo(0,0);
}

    burgerMen(){
        this.setState({ condition: !this.state.condition})
    }
    
    toggleSearch(){
        this.setState({ search: !this.state.search})
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
    <Link to="/"><li><h1>TECHIE PULSE</h1></li></Link>
    <li className={this.state.condition ? "navlist2" :"navList"}><a href="https://www.facebook.com/techiepulse/" target="_blank"><FaFB /></a></li>
    <li className={this.state.condition ? "navlist2" :"navList"}><a href="https://twitter.com/techie_pulse" target="_blank"><FaTW /></a></li>
    <li className={this.state.condition ? "navlist2" :"navList"}><a href="https://www.instagram.com/techiepulse/" target="_blank"><FaIN /></a></li>
    <li className={this.state.condition ? "navlist2" :"navList"}><a href="https://www.instagram.com/techiepulse/" target="_blank"><FaEmail /></a></li>
    <li className={this.state.condition ? "navlist2" :"navList"} style={{float:"right"}}><Link to="/about" activeClassName="active">About</Link></li>
    <li  className={this.state.condition ? "navlist2" :"navList"} style={{float:"right"}}><Link to="/contact" activeClassName="active">Contact</Link></li>
    <li className={this.state.condition ? "navlist2" :"navList"} style={{float:"right"}}><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
                <li className={this.state.condition ? "navlist2" :"navList"} style={{float:"right"}}><a onClick={this.toggleSearch.bind(this)}><FaBeer /></a></li>
    <li className="mobileBar" style={{float:"right"}}><a onClick={this.burgerMen.bind(this)}><FaBar /></a></li>
  </ul>
                    
   </section>
            
            <section className="navBar2">
            <ul>
    <li className={this.state.condition ? "navlist2" :"navList"} style={{float:"right"}}><Link to="/gadgets" activeClassName="active">Gadgets</Link></li>
    <li className={this.state.condition ? "navlist2" :"navList"} style={{float:"right"}}><Link to="/mobile" activeClassName="active">Mobile</Link></li>  
  </ul>
                    
   </section>
            {this.state.search ? 
                <section className="navBar">
                    <ul>
                        <li className={this.state.condition ? "navlist2" :"navList"}><Link to="/gadgets" activeClassName="active">Search</Link></li>           
                    </ul>
                </section>
            : ""
            }
            
            
        
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
            
            
            <footer className="footer">
                <Grid>
                    <Row className="show-grid">
                        <Col sm={6}>
                            <h4>&copy; 2017 Techie Pulse | All Rights Reserved</h4>
                        </Col>
                        <Col sm={6} className="right">
                            <h4>Privacy Policy | Terms &amp; Conditions</h4>
                        </Col>
                    </Row>
                </Grid>
            </footer>
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