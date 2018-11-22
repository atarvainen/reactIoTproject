import React, { Component } from 'react';
import './App.css';
import Login from './login';

class Navbar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        showLogin: false,
      }
    }

    gettags() {
        console.log(localStorage.getItem("asdf"));
        localStorage.clear();
    }

    toggleLogin() {
        this.setState({
          showLogin: !this.state.showLogin
        });
    }

    clear() {
        this.value='';
    }

    handleSubmit() {
        console.log("handling");
        localStorage.setItem('test', 'test');
        fetch("http://localhost:8000/api/tags")
        .then(res => res.json())
        .then(
          (result) => {
            console.log("saving");
            localStorage.removeItem('asdf');
            localStorage.setItem('asdf', 'asdf');
          },
          (error) => {
            this.setState({
              isLoaded: false,
              error
            });
          }
        )
      }

    render() {
        return (
            <div id="nav">
                {this.state.showLogin ? 
                <Login clear={this.clear.bind(this)} closeLogin={this.toggleLogin.bind(this)}/>
                : null
                }
                <a className="button1" href="something">Läsnäolo</a>
                <a className="button1" href="something">Relaamon lämpötila!?</a>
                <a className="button1" href="something">Relaamon kosteus!?</a>
                <button className="button1" onClick={this.gettags.bind(this)}>getdata</button>
                <button className="button1" onClick={this.toggleLogin.bind(this)}>Login</button>
            </div>
        )
    }
}

export default Navbar;