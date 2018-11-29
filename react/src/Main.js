import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar';
import Settings from './Settings';
import ChartMenu from './ChartMenu';
import { ip } from './ServerConf';
import WebWorker from './WebWorker';
import ChartWorker from './ChartWorker';
import BarChart from './Bar';
import DoughnutChart from './Doughnut';
import LineChart from './Line';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            token: props.token,
            isLoggedIn: props.isLoggedIn,
            data: {
                title: ""
            },
            error: null,
            isLoaded: false,
            axisy: [],
            axisx: [],
            showSettings: false,
            showAttMenu: false,
            showTempMenu: false,
            showHumMenu: false,
            chartChoice: "",
        }
        this.toggleSettings = this.toggleSettings.bind(this);
        this.getData = this.getData.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.createCharts = this.createCharts.bind(this);
        this.handleChartChoice = this.handleChartChoice.bind(this);
    }

    componentDidMount() {
    }

    createCharts() {
        this.worker = new WebWorker(ChartWorker);

        this.worker.addEventListener('message', event => {
            const data = event.data;
            console.log(data);
        });

        this.worker.postMessage(this.state.data);
    }

    fetchData(url, method, headers, title) {
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
                        ],
                        title: title
                    },
                    isLoaded: true,
                    axisy: result.map(x => x.Time),
                    axisx: result.map(x => x.Temp),
                });
            })
            .catch((error) => {
                if (error.name === "TypeError") {
                    alert("Failed fetching");
                }
                else {
                    console.log("error", error);
                    error.json().then(err => { alert(err.error) });
                }
            });
    }

    handleChartChoice(e) {
        this.setState({ chartChoice: e.target.value })
    }

    getData(e) {
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${sessionStorage.getItem('tok').replace(/"/g, '')}`
        };
        this.fetchData(("http://" + ip + "/api/tagtemp/257385652260480/day/2018-11-24"), "get", headers, e);
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
        console.log(this.state.chartChoice);
        let ChartType;
        let chart;
        let chartMenu;

        if (this.state.chartChoice !== "" && this.state.chartChoice === "BarChart") {
            ChartType = BarChart;
        }
        else if (this.state.chartChoice !== "" && this.state.chartChoice === "LineChart") {
            ChartType = LineChart;
        }
        else if (this.state.chartChoice !== "" && this.state.chartChoice === "DoughnutChart") {
            ChartType = DoughnutChart;
        }

        if (this.state.chartChoice !== "" && this.state.isLoaded) {
            chart = <ChartType data={this.state.data} title={this.state.title} legendPosition="bottom" />
        }

        if (this.state.isLoggedIn) {
            chartMenu = <ChartMenu chartChoice={this.handleChartChoice} getData={this.getData} />
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