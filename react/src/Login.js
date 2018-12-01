import React, { Component } from 'react';
import './App.css';
import { ip } from './ServerConf';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      pass: "",
      loginFail: false,
      loginError: ""
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    //prevet default submit
    e.preventDefault();
    fetch((ip + "/api/login"), {
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
        //save name and token to session storage if login is successful
        //only strings can be saved to storage
        sessionStorage.setItem('tok', JSON.stringify(result.api_token));
        sessionStorage.setItem('nam', JSON.stringify(result.data.name));

        //check if api returned any ruuvitags belonging to user and set ruuvitags id to storage
        if (Object.keys(result.ruuvitags).length !== 0 && result.ruuvitags.constructor !== Object) {
          sessionStorage.setItem('ruuvi', JSON.stringify(result.ruuvitags[0].ruuvitagid));

          this.props.fetchWithWorker();
          this.props.handleLogin();
        }
        //if user has no tag, handle login differently
        else {
          console.log("trying to log");
          this.props.loginNoTag();
        }
      })
      .catch((error) => {
        if (error.status === 404) {
          this.setState({ loginFail: true, loginError: "Failed connecting to login service." });
        }
        //if api is not available, type error is raised
        else if (error.name === "TypeError") {
          console.log("type");
          this.setState({ loginFail: true, loginError: "Failed connecting to login service." });
        }
        //else we can parse the error message api sends us
        else {
          error.json().then(err => { this.setState({ loginFail: true, loginError: err.message }) });
        }
      });
  }
  //stop login_inner click from closing login
  handleClick(event) {
    event.stopPropagation();
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

    //render login error if something fails
    if (this.state.loginFail) {
      p = <p id='error'>{this.state.loginError}</p>;
    }
    return (
      <div className='login' onClick={this.props.closeLogin}>
        <div className='login_inner' onClick={this.handleClick}>
          <h1>Login</h1>
          {p}
          <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Email" onChange={this.handleChange}></input>
            <input type="password" placeholder="Password" onChange={this.handleChange}></input>
            <input className="button1" type="submit" value="Login"></input>
            <button className="button1" onClick={this.props.closeLogin}>Close</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
