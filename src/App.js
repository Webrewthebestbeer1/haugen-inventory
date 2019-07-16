import React from 'react';
import { withAuthenticator } from 'aws-amplify-react';
import { Hops } from './views/Hops';
import './App.css';

const App = () => {
  return (
    <Hops />
  );
}

export default withAuthenticator(App, true);
