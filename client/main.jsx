import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import '../imports/startup/accounts-config.js';
import App from '../imports/ui/layout/app.jsx';
import '/imports/startup/client';

//Meteor.startup(() => {
//  render(<App />, document.getElementById('render-target'));
//});
