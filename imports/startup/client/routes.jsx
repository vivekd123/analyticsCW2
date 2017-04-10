import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';


import  App2  from '../../ui/layout/app.jsx';
import  App  from '../../ui/App.jsx';
import  AppNew  from '../../ui/AppNew.jsx';
import { Hello } from '../../ui/pages/hello.jsx';

import { NotFound } from '../../ui/pages/not-found.jsx';

Meteor.startup( () => {
  render(
    <Router history={ browserHistory }>
      <Route path="/" component={ App2 }>
        <IndexRoute component={ App } />
        <Route path="/app1" component={ AppNew } /> 
        <Route path="/hello/:name" component={ Hello } />
      </Route>
     <Route path="*" component={ NotFound } />
    </Router>,
    document.getElementById( 'react-root' )
  );
});