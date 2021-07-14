import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import {AppBar} from './components';
import { withAuthenticator } from '@aws-amplify/ui-react'
import Auth from '@aws-amplify/auth';
import Dashboard from './dashboard/drawer/DrawerLayout';

function App() {

  return (
    <div className="App">
      <Dashboard/>
    </div>
  );
}

export default withAuthenticator(App);
