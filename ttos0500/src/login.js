import React, { Component } from 'react';
import './App.css';

class Login extends Component {
    constructor() {
      super();
      this.state = {
        value: "Username",
        pass: "password"
      }
      this.handleFocus = this.handleFocus.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handlepassFocus = this.handlepassFocus.bind(this);
      this.handlepassChange = this.handlepassChange.bind(this);
    }

    handleFocus(event) {
      if (this.state.value === "Username"){
        this.setState({value: ""});
      }
      else if (this.state.value === ""){
        this.setState({value: "Username"});
      }
    }
  
    handlepassFocus(event) {
      if (this.state.pass === "password"){
        this.setState({pass: ""});
      }
      else if (this.state.pass === ""){
        this.setState({pass: "password"});
      }
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handlepassChange(event) {
      this.setState({pass: event.target.value});
    }


    render() {
      return (
        <div className='login'>
          <div className='login_inner' onBlur={this.props.closeLogin}>
            <h1>Login</h1>
            <form method="get">
              <input type="text" value={this.state.value} onFocus={this.handleFocus} onBlur={this.handleFocus} onChange={this.handleChange}></input>
              <input type="password" value={this.state.pass} onFocus={this.handlepassFocus} onBlur={this.handlepassFocus} onChange={this.handlepassChange}></input>
              <input className="button1" type="submit" value="Login"></input>
              <button className="button1" onClick={this.props.closeLogin}>Close</button>
            </form>
          </div>
        </div>
      );
    }
}

export default Login;