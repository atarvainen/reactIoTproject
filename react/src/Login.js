import React, { Component } from 'react';
import './App.css';
import { ip } from './ServerConf';
import WebWorker from './WebWorker';
import TempFetch from './TempFetchWorker';
import AttFetch from './AttFetchWorker';
import HumFetch from './HumFetchWorker';

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
    this.fetchWithWorker = this.fetchWithWorker.bind(this);
  }

  componentDidMount() {
    this.tempWorker = new WebWorker(TempFetch);
    this.attWorker = new WebWorker(AttFetch);
    this.humWorker = new WebWorker(HumFetch);

    this.tempWorker.addEventListener('message', event => {
      const chartData = event.data;

      console.log(chartData);
      this.props.handleChartData(chartData);
    });
    this.attWorker.addEventListener('message', event => {
      const chartData = event.data;

      console.log(chartData);
      this.props.handleChartData(chartData);
    });
    this.humWorker.addEventListener('message', event => {
      const chartData = event.data;

      console.log(chartData);
      this.props.handleChartData(chartData);
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch((ip + "/api/login"), { //Muokattu alkuperäinen: "http://localhost:8000/api/login"
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
        sessionStorage.setItem('tok', JSON.stringify(result.api_token));
        sessionStorage.setItem('nam', JSON.stringify(result.data.name));
        this.fetchWithWorker();
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

  fetchWithWorker() {
    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${sessionStorage.getItem('tok').replace(/"/g, '')}`
    };
    let fetchData = {
        headers: headers,
        method: "get",
        url: (ip + "/api/data")
    }

    this.attWorker.postMessage(fetchData);
    this.humWorker.postMessage(fetchData);
    this.tempWorker.postMessage(fetchData);
  }

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

    if (this.state.loginFail) {
      p = <p id='error'>{this.state.loginError}</p>;
    }
    return (
      <div className='login' onClick={this.props.closeLogin}>
        <div className='login_inner' onClick={this.handleClick}>
          <h1>Login</h1>
          {p}
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input type="text" placeholder="Email" onChange={this.handleChange.bind(this)}></input>
            <input type="password" placeholder="Password" onChange={this.handleChange.bind(this)}></input>
            <input className="button1" type="submit" value="Login"></input>
            <button className="button1" onClick={this.props.closeLogin}>Close</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
