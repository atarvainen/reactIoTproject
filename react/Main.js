import React, { Component } from 'react';
import './App.css';
import BarChart from './Bar';
import DoughnutChart from './Doughnut';
import LineChart from './Line';
import Navbar from './Navbar';
import Settings from './Settings';
import ChartMenu from './ChartMenu';
import { ip } from './ServerConf';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            token: props.token,
            isLoggedIn: props.isLoggedIn,
            barData: {},
            lineData: {},
            doughnutData: {},
            error: null,
            isLoaded: false,
            axisy: [],
            axisx: [],
            showSettings: false,
            showAttMenu: false,
            showTempMenu: false,
            showHumMenu: false,
            chartChoice: "",
            title: ""
        }
        this.toggleSettings = this.toggleSettings.bind(this);
        this.getHum = this.getHum.bind(this);
        this.getTemp = this.getTemp.bind(this);
        this.getAtt = this.getAtt.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    fetchData(url, method, headers, chartChoice, title) {
        fetch(url, {
            method: method,
            headers: headers
        })
            .then((result) => {
                if (result.ok) {
                    return result.json();
                }
                throw result;
            })
            .then((result) => {
                this.setState({
                    data: {
                        labels: result.map(x => x.Time),
                        datasets: [
                            {
                                label: "Time",
                                backgroundColor: "rgba(0,0,0,0.8)",
                                data: result.map(x => x.Temp)
                            }
                        ]
                    },
                    isLoaded: true,
                    axisy: result.map(x => x.Time),
                    axisx: result.map(x => x.Temp),
                    chartChoice: chartChoice,
                    title: title
                });
            })
            .catch((error) => {
                if (error.name === "TypeError") {
                    alert("Failed connecting to login service.");
                }
                else {
                    error.json().then(err => { alert(err.error) });
                }
            });
    }

    getTemp(e) {
        console.log("getting temp");
        console.log(e.target.value);
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${sessionStorage.getItem('tok').replace(/"/g, '')}`
        };
        this.fetchData(("http://" + ip + "/api/data"), "get", headers, e.target.value, "Temp");
    }

    getHum(e) {
        console.log("getting humidity");
        console.log(e.target.value);
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${sessionStorage.getItem('tok').replace(/"/g, '')}`
        };
        this.fetchData(("http://" + ip + "/api/data"), "get", headers, e.target.value, "Humidity");
    }

    getAtt(e) {
        console.log("getting attendance");
        console.log(e.target.value);
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${sessionStorage.getItem('tok').replace(/"/g, '')}`
        };
        this.fetchData(("http://" + ip + "/api/data"), "get", headers, e.target.value, "Attendance");
    }

    toggleSettings() {
        this.setState({ showSettings: !this.state.showSettings });
    }

    handleLogout() {
        this.setState({ isLoggedIn: false, isLoaded: false });
    }

    handleLogin() {
        this.setState({ isLoggedIn: true });
    }

    render() {
        let ChartType;
        let chart;
        let chartMenu;

        if (this.state.chartChoice === "BarChart") {
            ChartType = BarChart;
        }
        else if (this.state.chartChoice === "LineChart") {
            ChartType = LineChart;
        }
        else if (this.state.chartChoice === "DoughnutChart") {
            ChartType = DoughnutChart;
        }

        if (this.state.isLoaded) {
            chart = <ChartType data={this.state.data} title={this.state.title} legendPosition="bottom" />
        }

        if (this.state.isLoggedIn) {
            chartMenu = <ChartMenu getTemp={this.getTemp} getHum={this.getHum} getAtt={this.getAtt} />
        }
        else {
            chartMenu = <p>Please login or register to view data.</p>
        }

        return (
            <div className="App">
                <header className="App-header">
                    <Navbar login={this.handleLogin} logout={this.handleLogout} toggleSettings={this.toggleSettings} isLoggedIn={this.state.isLoggedIn} user={this.state.user} token={this.state.token} settings={this.handleSettingsClick} />
                </header>
                {this.state.showSettings ?
                    <Settings closeSettings={this.toggleSettings} />
                    : null
                }
                {chartMenu}
                {chart}
            </div>
        );
    }
}

export default Main;
