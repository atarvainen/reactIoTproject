import React, { Component } from 'react';
import './App.css';
import { ip } from './ServerConf';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            pass: "",
            passConf: "",
            registerFail: false,
            registerError: ""
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //fetch post register to api and handle response
    handleSubmit(e) {
        e.preventDefault();
        if (this.state.pass === this.state.passConf) {
            fetch((ip + "/api/register"), {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.pass,
                    password_confirmation: this.state.passConf
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
                    this.props.handleRegister();
                })
                .catch((error) => {
                    if (error.status === 404) {
                        this.setState({ registerFail: true, registerError: "Failed connecting to register service." });
                    }
                    else if (error.name === "TypeError") {
                        this.setState({ registerFail: true, registerError: "Failed connecting to register service." });
                    }
                    else {
                        error.json().then(err => { this.setState({ registerFail: true, registerError: err.message }) });
                    }
                });
        }
        else {
            this.setState({ registerFail: true, registerError: "Please match your passwords." });
        }
    }

    handleClick(event) {
        event.stopPropagation();
    }

    handleChange(a, b) {
        if (a === 1) {
            this.setState({ name: b.target.value });
        }
        else if (a === 2) {
            this.setState({ email: b.target.value });
        }
        else if (a === 3) {
            this.setState({ pass: b.target.value });
        }
        else {
            this.setState({ passConf: b.target.value });
        }
    }

    render() {
        let p;

        //if registering fails render error message
        if (this.state.registerFail) {
            p = <p id='error'>{this.state.registerError}</p>;
        }
        return (
            <div className='login' onClick={this.props.closeRegister}>
                <div className='login_inner' onClick={this.handleClick}>
                    <h1>Register</h1>
                    {p}
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" placeholder="Nimi" onChange={this.handleChange.bind(this, 1)}></input>
                        <input type="text" placeholder="Email" onChange={this.handleChange.bind(this, 2)}></input>
                        <input type="password" placeholder="Password" onChange={this.handleChange.bind(this, 3)}></input>
                        <input type="password" placeholder="Password confirmation" onChange={this.handleChange.bind(this, 4)}></input>
                        <input className="button1" type="submit" value="Register"></input>
                        <button className="button1" onClick={this.props.closeRegister}>Close</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Register;
