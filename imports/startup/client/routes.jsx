import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';


import  App2  from '../../ui/layout/app.jsx';
import  App  from '../../ui/App.jsx';
import  AppNew  from '../../ui/AppNew.jsx';
import  Post  from '../../ui/Post.jsx';
import  About  from '../../ui/About.jsx';
import  Contact  from '../../ui/Contact.jsx';
import { Hello } from '../../ui/pages/hello.jsx';

import { NotFound } from '../../ui/pages/not-found.jsx';

Meteor.startup( () => {
  render(
    <Router history={ browserHistory }>
      <Route path="/" component={ App2 }>
        <IndexRoute component={ AppNew } />
        <Route path="/app1" component={ App } /> 
          <Route path="/posts/:title" component={ Post } /> 
          <Route path="/about" component={ About } /> 
          <Route path="/contact" component={ Contact } /> 
        <Route path="/hello/:name" component={ Hello } />
      </Route>
     <Route path="*" component={ NotFound } />
    </Router>,
    document.getElementById( 'react-root' )
  );
});