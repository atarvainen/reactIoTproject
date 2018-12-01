import React, { Component } from 'react';
import './App.css';
import Login from './Login';
import Register from './Register';
import { ip } from './ServerConf';

function LoginButton(props) {
  return (
    <button className="button1" onClick={props.onClick}>Login</button>
  );
}

function RegisterButton(props) {
  return (
    <button className="button1" onClick={props.onClick}>Register</button>
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
      showRegister: false,
      isLoggedIn: props.isLoggedIn,
      user: props.user,
      token: props.token,
      ruuvi: props.ruuvi
    }
    this.handleRegisterClick = this.handleRegisterClick.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLoginClickNoTag = this.handleLoginClickNoTag.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.toggleLogin = this.toggleLogin.bind(this);
    this.toggleRegister = this.toggleRegister.bind(this);
  }

  //set logged status and call parent to handle login as well
  handleLoginClick() {
    this.setState({
      isLoggedIn: true,
      user: sessionStorage.getItem("nam"),
      token: sessionStorage.getItem("tok"),
      ruuvi: sessionStorage.getItem("ruuvi"),
      showLogin: !this.state.showLogin
    });
    this.props.login();
  }

  handleLoginClickNoTag() {
    this.setState({
      isLoggedIn: true,
      user: sessionStorage.getItem("nam"),
      token: sessionStorage.getItem("tok"),
      showLogin: !this.state.showLogin
    });
    this.props.loginNoTag();
  }

  //set logged status and call parent to handle login as well
  handleRegisterClick() {
    this.setState({
      isLoggedIn: true,
      user: sessionStorage.getItem("nam"),
      token: sessionStorage.getItem("tok"),
      showRegister: !this.state.showRegister
    });
    this.props.loginNoTag();
  }

  toggleLogin() {
    this.setState({
      showLogin: !this.state.showLogin
    });
  }

  toggleRegister() {
    this.setState({
      showRegister: !this.state.showRegister
    });
  }

  //fetch post logout to api for handling and call parent to handle logout as well
  //logout even if api cant handle the request so catching errors is not needed
  //clear sessionStorage here
  handleLogoutClick() {
    fetch((ip + "/api/logout"), {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${sessionStorage.getItem('tok').replace(/"/g, '')}`
      },
    })
    sessionStorage.clear();
    this.setState({ isLoggedIn: false });
    this.props.logout();
  }

  render() {
    let button;
    let button2;

    //set navbar buttons to reflect if user is logged in or not
    if (this.state.isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
      button2 = <span id="username" onClick={this.props.toggleSettings}>{sessionStorage.getItem("nam").replace(/"/g, '')}</span>
    } else {
      button = <LoginButton onClick={this.toggleLogin} />;
      button2 = <RegisterButton onClick={this.toggleRegister} />;
    }
    return (
      <div id="nav">
        <h1 id="title">Relaamo Ruuvitag</h1>
        <div id="info">
          {this.state.showLogin ?
            <Login loginNoTag={this.handleLoginClickNoTag} fetchWithWorker={this.props.fetchWithWorker} handleChartData={this.props.handleChartData} closeLogin={this.toggleLogin} handleLogin={this.handleLoginClick} />
            : null
          }
          {this.state.showRegister ?
            <Register closeRegister={this.toggleRegister} handleRegister={this.handleRegisterClick} />
            : null
          }
          {button2}
          {button}
        </div>
      </div>
    )
  }
}

export default Navbar;