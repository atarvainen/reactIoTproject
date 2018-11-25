import React, { Component } from 'react';
import './App.css';
import Logged from './Logged';

//Check for login and render appropriate view
class App extends Component {

  render() {
    if (sessionStorage.getItem('nam') === null) {
      console.log(sessionStorage.getItem('nam'));
      return (
        <Logged isLoggedIn={false}/>
      );
    }
    else {
      return (
        <Logged isLoggedIn={true} user={sessionStorage.getItem('nam')} token={sessionStorage.getItem('tok')}/>
      )
    }
  }
}

export default App;