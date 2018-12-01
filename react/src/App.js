import React, { Component } from 'react';
import './App.css';
import Main from './Main';

//Check sessionstorage for login and render appropriate view
class App extends Component {

  render() {
    if (sessionStorage.getItem('nam') === null) {
      return (
        <Main isLoggedIn={false} />
      );
    }
    else if (sessionStorage.getItem('ruuvi') !== null) {
      return (
        <Main hasTag={true} isLoggedIn={true} user={sessionStorage.getItem('nam')} token={sessionStorage.getItem('tok')} ruuvi={sessionStorage.getItem('ruuvi')} />
      )
    }
    else {
      return (
        <Main hasTag={false} isLoggedIn={true} user={sessionStorage.getItem('nam')} token={sessionStorage.getItem('tok')} />
      )
    }
  }
}

export default App;