import React, { Component } from 'react';
import './App.css';

class Login extends Component {
    constructor() {
      super();
      this.state = {
        value: "Username",
        pass: "password",
        useless: ""
      }
      this.handleClick = this.handleClick.bind(this);
      this.handleFocus = this.handleFocus.bind(this);
      this.handleChange = this.handleChange.bind(this);
      //this.handleSubmit = this.handleSubmit.bind(this);asdfasdf
    }

    handleSubmit(e) {
      e.preventDefault();
      fetch("http://localhost:8000/api/tags")
      .then(res => res.json())
      .then(
        (result) => {
          sessionStorage.setItem('tok', JSON.stringify(result));
          this.props.closeLogin();
        },
        (error) => {
          alert('Request failure: ', error);
        }
      )
    }

    handleClick(event) {
      event.stopPropagation();
    }

    handleFocus(a) {
      if(a.target.type === "text") {
        if (this.state.value === "Username"){
          this.setState({value: ""});
        }
        else if (this.state.value === ""){
          this.setState({value: "Username"});
        }
      }
      else {
        if (this.state.pass === "password"){
          this.setState({pass: ""});
        }
        else if (this.state.pass === ""){
          this.setState({pass: "password"});
        }
      }
    }

    handleChange(a) {
      if(a.target.type === "text") {
        this.setState({value: a.target.value});
      }
      else {
        this.setState({pass: a.target.value});
      }
    }

    render() {
      return (
        <div className='login'>
          <div className='login_inner' onClick={this.handleClick}>
            <h1>Login</h1>
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