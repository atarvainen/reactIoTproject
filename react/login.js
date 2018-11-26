import React, { Component } from 'react';
import './App.css';
import { ip } from './ServerConf';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "Email",
      pass: "password",
      loginFail: false,
      loginError: ""
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch(("http://" + ip + "/api/login"), { //Muokattu alkuperäinen: "http://localhost:8000/api/login"
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.value,
        password: this.state.pass
      })
    })
      .then((result) => {
        if (result.ok) {
          return result.json();
        }
        throw result;
      })
      .then((result) => {
        sessionStorage.setItem('tok', JSON.stringify(result.data.api_token));
        sessionStorage.setItem('nam', JSON.stringify(result.data.name));
        this.props.handleLogin();
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
  }

  handleClick(event) {
    event.stopPropagation();
  }

  handleFocus(a) {
    if (a.target.type === "text") {
      if (this.state.value === "Email") {
        this.setState({ value: "" });
      }
      else if (this.state.value === "") {
        this.setState({ value: "Email" });
      }
    }
    else {
      if (this.state.pass === "password") {
        this.setState({ pass: "" });
      }
      else if (this.state.pass === "") {
        this.setState({ pass: "password" });
      }
    }
  }

  handleChange(a) {
    if (a.target.type === "text") {
      this.setState({ value: a.target.value });
    }
    else {
      this.setState({ pass: a.target.value });
    }
  }

  render() {
    let p;

    if (this.state.loginFail) {
      p = <p id='error'>{this.state.loginError}</p>;
    }
    return (
      <div className='login' onClick={this.props.closeLogin}>
        <div className='login_inner' onClick={this.handleClick}>
          <h1>Login</h1>
          {p}
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input type="text" value={this.state.value} onFocus={this.handleFocus.bind(this)} onBlur={this.handleFocus.bind(this)} onChange={this.handleChange.bind(this)}></input>
            <input type="password" value={this.state.pass} onFocus={this.handleFocus.bind(this)} onBlur={this.handleFocus.bind(this)} onChange={this.handleChange.bind(this)}></input>
            <input className="button1" type="submit" value="Login"></input>
            <button className="button1" onClick={this.props.closeLogin}>Close</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
