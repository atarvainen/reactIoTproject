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
      token: props.token
    }
    this.handleRegisterClick = this.handleRegisterClick.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.toggleLogin = this.toggleLogin.bind(this);
    this.toggleRegister = this.toggleRegister.bind(this);
  }

  handleLoginClick() {
    this.setState({
      isLoggedIn: true,
      user: sessionStorage.getItem("nam"),
      token: sessionStorage.getItem("tok"),
      showLogin: !this.state.showLogin
    });
    this.props.login();
  }

  handleRegisterClick() {
    this.setState({
      isLoggedIn: true,
      user: sessionStorage.getItem("nam"),
      token: sessionStorage.getItem("tok"),
      showRegister: !this.state.showRegister
    });
    this.props.login();
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

  clear() {
    this.value = '';
  }

  handleLogoutClick() {
    fetch(("http://" + ip + "/api/logout"), {  //Muokattu alkuperäinen: http://localhost:8000/api/logout
      method: 'post',
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem('tok').replace(/"/g, '')}`,
      },
    })
      .then((result) => {
        if (result.ok) {
          return result.json();
        }
        throw result;
      })
      .catch((error) => {
        if (error.status === 404) {
          this.setState({ loginFail: true, loginError: "Failed connecting to login service." });
        }
        else if (error.name === "TypeError") {
          this.setState({ loginFail: true, loginError: "Failed connecting to login service." });
        }
        else {
          error.json().then(err => { this.setState({ loginFail: true, loginError: err.message }) });
        }
      });
    sessionStorage.clear();
    this.setState({ isLoggedIn: false });
    this.props.logout();
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    let button2;

    if (isLoggedIn) {
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
            <Login handleChartData={this.props.handleChartData} clear={this.clear.bind(this)} closeLogin={this.toggleLogin} handleLogin={this.handleLoginClick} />
            : null
          }
          {this.state.showRegister ?
            <Register clear={this.clear.bind(this)} closeRegister={this.toggleRegister} handleRegister={this.handleRegisterClick} />
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