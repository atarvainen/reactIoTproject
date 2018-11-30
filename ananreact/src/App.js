import React, { Component } from 'react';
import './App.css';
import Main from './Main';

//Check for login and render appropriate view
class App extends Component {

  render() {
    if (sessionStorage.getItem('nam') === null) {
      return (
        <Main isLoggedIn={false} />
      );
    }
    else {
      return (
        <Main isLoggedIn={true} user={sessionStorage.getItem('nam')} token={sessionStorage.getItem('tok')} />
      )
    }
  }
}

export default App;