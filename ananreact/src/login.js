import React, { Component } from 'react';
import './App.css';

class Login extends Component {
    constructor() {
      super();
      this.state = {
        value: "Username",
        pass: "password"
      }
      this.handleClick = this.handleClick.bind(this);
      this.handleFocus = this.handleFocus.bind(this);
      this.handleChange = this.handleChange.bind(this);
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
        <div className='login' onClick={this.props.closeLogin}>
          <div className='login_inner' onClick={this.handleClick}>
            <h1>Login</h1>
            <form method="get">
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