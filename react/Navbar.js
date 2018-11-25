import React, { Component } from 'react';
import './App.css';
import Login from './login';

function LoginButton(props) {
  return (
    <button className="button1" onClick={props.onClick}>Login</button>
  );
}

function LogoutButton(props) {
  return (
    <button className="button1" onClick={props.onClick}>Logout</button>
  );
}

class Navbar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        showLogin: false,
        isLoggedIn: props.isLoggedIn,
        user: props.user,
        token: props.token
      }
      this.handleLoginClick = this.handleLoginClick.bind(this);
      this.handleLogoutClick = this.handleLogoutClick.bind(this);
      this.toggleLogin = this.toggleLogin.bind(this);
    }

    handleLoginClick() {
      this.setState({
        isLoggedIn: true,
        user: sessionStorage.getItem("nam"),
        token: sessionStorage.getItem("tok"),
        showLogin: !this.state.showLogin
      });
    }

    toggleLogin() {
      this.setState({
        showLogin: !this.state.showLogin
      });
    }

    clear() {
      this.value='';
    }

    handleLogoutClick() {
      sessionStorage.clear();
      this.setState({isLoggedIn: false});
    }

    render() {
      const isLoggedIn = this.state.isLoggedIn;
      let button;
      let span;

      if (isLoggedIn) {
        button = <LogoutButton onClick={this.handleLogoutClick} />;
        span = <span id="username" onClick={this.props.toggleSettings}>{sessionStorage.getItem("nam")}</span>
      } else {
        button = <LoginButton onClick={this.toggleLogin} />;
      }
      return (
          <div id="nav">
            <h1 id="title">Relaamo Ruuvitag</h1>
            <div id="info">
              {this.state.showLogin ? 
              <Login clear={this.clear.bind(this)} closeLogin={this.toggleLogin} handleLogin={this.handleLoginClick}/>
              : null
              }
              {span}
              {button}
            </div>
          </div>
      )
    }
}

export default Navbar;